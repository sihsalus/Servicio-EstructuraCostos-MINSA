import CostStructureModel from "@/models/coststructure/CostStructureModel";
import MedicalProcedureModel from "@/models/coststructure/MedicalProcedureModel";
import ActivityCostExecutionModel from "@/models/coststructure/ActivityCostExecutionModel";
import ActivityModel from "@/models/coststructure/ActivityModel";
import RrhhCostModel from "@/models/rrhh/RrhhCostModel";
import HumanResourceModel from "@/models/rrhh/HumanResourceModel";
import SupplyCostModel from "@/models/supply/SupplyCostModel";
import SupplyModel from "@/models/supply/SupplyModel";
import EquipmentCostModel from "@/models/equipment/EquipmentCostModel";
import EquipmentModel from "@/models/equipment/EquipmentModel";
import CustomError from "@/utils/CustomError";
import { CreateCostStructureInput, CreateCostStructureSchema } from "@/interfaces/CostStructure";
import sequelize from "@/config/db";
import InfrastructureCostModel from "@/models/infrastructure/InfrastructureCostModel";

class CostStructureService {

    static async getFullRecipeByCpms(cpmsCode: string, fiscalYearId: number) {
        const recipe = await CostStructureModel.findOne({
            where: { fiscal_year_id: fiscalYearId },
            include: [
                {
                    model: MedicalProcedureModel,
                    as: 'procedure',
                    where: { cpms_code: cpmsCode } 
                },
                {
                    model: ActivityCostExecutionModel,
                    as: 'activitiesCost',
                    include: [
                        { model: ActivityModel, as: 'activityDefinition' }, 
                        { 
                            model: RrhhCostModel, 
                            as: 'rrhhCosts',
                            include: [{ model: HumanResourceModel, as: 'humanResource' }] 
                        },
                        { 
                            model: SupplyCostModel, 
                            as: 'supplyCosts',
                            include: [{ model: SupplyModel, as: 'supply' }] 
                        },
                        { 
                            model: EquipmentCostModel, 
                            as: 'equipmentCosts',
                            include: [{ model: EquipmentModel, as: 'equipment' }] 
                        }
                    ]
                }
            ]
        });

        if (!recipe) {
            throw new CustomError(`No se encontró una estructura de costo estándar configurada para el CPMS ${cpmsCode} en este año fiscal`, 404);
        }

        return recipe;
    }

    static async createCostStructure(data: CreateCostStructureInput) {
        const parsed = CreateCostStructureSchema.safeParse(data);
        if (!parsed.success) {
            throw new CustomError("Formato de estructura de costos inválido", 400);
        }

        const { 
            medicalProcedureId, 
            fiscalYearId, 
            totalTimeMinutes, 
            totalStandarCost, 
            activitiesCost,
            infrastructureCost 
        } = parsed.data

        const t = await sequelize.transaction();

        try{
            const newStructure = await CostStructureModel.create({
                medical_procedure_id: medicalProcedureId,
                fiscal_year_id: fiscalYearId,
                total_time_minutes: totalTimeMinutes,
                total_standar_cost: totalStandarCost,

                infrastructureCost: infrastructureCost.map(inf => ({
                    infrastructure_id: inf.infrastructure_id,
                    price_history_id: inf.price_history_id,
                    partial_cost: inf.partial_cost
                })),

                activitiesCost: activitiesCost.map(act => ({
                    activity_id: act.activity_id,
                    time_minutes: act.time_minutes,
                    total_activity_cost: act.total_activity_cost,
                    rrhhCosts: act.rrhhCosts,
                    supplyCosts: act.supplyCosts,
                    equipmentCosts: act.equipmentCosts
                }))
            },{
                include:[
                    {model: InfrastructureCostModel, as:'infrastructureCost'},
                    {
                        model: ActivityCostExecutionModel,
                        as:'activitiesCost',
                        include:[
                            {model: RrhhCostModel, as:'rrhhCost'},
                            {model: SupplyCostModel, as:'supplyCosts'},
                            {model: EquipmentCostModel, as:'equipmentCosts'}
                        ]
                    }
                ],
                transaction:t
            });

            await t.commit();
            return newStructure;
        }catch(error){
            await t.rollback();
        }
    }
}

export default CostStructureService;