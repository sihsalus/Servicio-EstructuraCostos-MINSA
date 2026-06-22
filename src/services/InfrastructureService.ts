import CostStructureConst from "@/const/CostStructureConst";
import { CreateInfrastructureInput, CreateInfrastructureSchema, CreateUpssAnnualConfigInput, CreateUpssAnnualConfigSchema } from "@/interfaces/infra";
import InfrastructureModel from "@/models/infrastructure/InfrastructureModel";
import UpssAnnualConfigModel from "@/models/infrastructure/UpssAnualConfigModel";
import IpressGlobalCostModel from "@/models/IpressGlobalCostModel";
import { calculateInductor, calculatePorrateo, calculatePorrateoGeneral, calculateUniCostPorrateo } from "@/utils/costStructureFormulas";
import CustomError from "@/utils/CustomError";

class InfrastructureService{
    static async getAll(){
        return await InfrastructureModel.findAll();
    }

    static async findById(id : number){

        const existing = await InfrastructureModel.findOne({
            where:{id}
        });

        if(!existing){
            throw new CustomError("Infraestructura no encontrada",404);
        }

        return existing;
    }

    static async createInfrastructure(data: CreateInfrastructureInput){
        const validation = CreateInfrastructureSchema.safeParse(data);

        if(!validation.success){
            throw new CustomError("Formato de Infraestructura inválido", 400);
        }

        const {name,areaM2,createdBy,description} = validation.data!;
        
        const existing = await InfrastructureModel.findOne({
            where:{name}
        });
        
        if(existing) return existing;

        return await InfrastructureModel.create({
            name,
            area_m2:areaM2,
            description,
            created_by: createdBy ?? CostStructureConst.DEFAULT_USER_SYSTEM
        })
    }

    static async createOrUpdateConfig(data: CreateUpssAnnualConfigInput) {
        const parsed = CreateUpssAnnualConfigSchema.safeParse(data);
        if (!parsed.success) {
            throw new CustomError("Formato de configuaricion infraestructura incorrecto", 400);
        }

        const { infrastructureId, fiscalYearId, projectedAnnualProcedures, energyWeight, waterWeight, phoneWeight } = parsed.data;

        const [config, created] = await UpssAnnualConfigModel.findOrCreate({
            where: { infrastructure_id: infrastructureId,
                 fiscal_year_id: fiscalYearId },
            defaults: {
                infrastructure_id: infrastructureId,
                fiscal_year_id: fiscalYearId,
                projected_annual_procedures: projectedAnnualProcedures,
                energy_weight: energyWeight,
                water_weight: waterWeight,
                phone_weight: phoneWeight
            }
        });

        if (!created) {
            await config.update({
                projected_annual_procedures: projectedAnnualProcedures,
                energy_weight: energyWeight,
                water_weight: waterWeight,
                phone_weight: phoneWeight
            });
        }

        return config;
    } 


    static async executeProrrateo(fiscalYearId: number) {

        const globalCosts = await IpressGlobalCostModel.findOne({ where: { fiscal_year_id: fiscalYearId } });
        if (!globalCosts) {
            throw new CustomError("No se pueden calcular los costos indirectos. Primero registre los Gastos Globales del año.", 404);
        }

        const upssConfigs = await UpssAnnualConfigModel.findAll({
            where: { fiscal_year_id: fiscalYearId },
            include: [{ model: InfrastructureModel, as: 'infrastructure' }]
        });

        if (upssConfigs.length === 0) {
            throw new CustomError("No hay UPSS configuradas con pesos para este año fiscal.", 400);
        }

        let totalIdeEnergy = 0;
        let totalIdeWater = 0;
        let totalIdePhone = 0;
        let totalTacArea = 0; 

        upssConfigs.forEach((config: any) => {
            const area = parseFloat(config.infrastructure.area_m2);
            
            totalIdeEnergy += calculateInductor(parseFloat(config.energy_weight), area);
            totalIdeWater += calculateInductor(parseFloat(config.water_weight), area);
            totalIdePhone += calculateInductor(parseFloat(config.phone_weight), area);
            
            totalTacArea += area;
        });

        for (const config of upssConfigs as any) {
            const area = parseFloat(config.infrastructure.area_m2);

            const ideEnergy = calculateInductor(parseFloat(config.energy_weight), area);
            const ideWater = calculateInductor(parseFloat(config.water_weight), area);
            const idePhone = calculateInductor(parseFloat(config.phone_weight), area);

            const aceEnergy = calculatePorrateo(ideEnergy, totalIdeEnergy, parseFloat(globalCosts.get('energy_annual_cost') as string));
            const acaWater = calculatePorrateo(ideWater, totalIdeWater, parseFloat(globalCosts.get('water_annual_cost') as string));
            const actPhone = calculatePorrateo(idePhone, totalIdePhone, parseFloat(globalCosts.get('phone_annual_cost') as string));

            const cpaAdmin = calculatePorrateoGeneral(parseFloat(globalCosts.get('admin_annual_cost') as string), totalTacArea, area);
            const cpsGeneral = calculatePorrateoGeneral(parseFloat(globalCosts.get('general_services_annual_cost') as string), totalTacArea, area);

            const totalBasicServices = aceEnergy + acaWater + actPhone;
            const projectedPatients = config.projected_annual_procedures;

            await config.update({
                unit_basic_services_cost: calculateUniCostPorrateo(totalBasicServices, projectedPatients),
                unit_admin_cost: calculateUniCostPorrateo(cpaAdmin, projectedPatients),
                unit_general_services_cost: calculateUniCostPorrateo(cpsGeneral, projectedPatients)
            });
        }

        return { message: "Algoritmo de prorrateo ejecutado con éxito utilizando utilitarios matemáticos." };
    }
}
export default InfrastructureService;