
import CustomError from "@/utils/CustomError";
import IpressGlobalCostModel from "@/models/IpressGlobalCostModel";
import { CreateIpressGlobalCostInput, CreateIpressGlobalCostSchema } from "@/interfaces/IpressGlobal";
class IpressGlobalCostService {

    static async getByFiscalYear(fiscalYearId: number) {
        return await IpressGlobalCostModel.findOne({
            where: { fiscal_year_id: fiscalYearId }
        });
    }

    static async createGlobalCost(data: CreateIpressGlobalCostInput) {
        const parsed = CreateIpressGlobalCostSchema.safeParse(data);
        if (!parsed.success) {
            throw new CustomError("Los datos de costos globales enviados son inválidos", 400);
        }

        const { fiscalYearId, energyAnnualCost, waterAnnualCost, phoneAnnualCost, adminAnnualCost, generalServicesAnnualCost } = parsed.data;

        const existingCost = await IpressGlobalCostModel.findOne({
            where: { fiscal_year_id: fiscalYearId }
        });

        if (existingCost) {
            throw new CustomError(`Ya existen gastos globales registrados para el año fiscal seleccionado`, 409);
        }

        const newGlobalCost = await IpressGlobalCostModel.create({
            fiscal_year_id: fiscalYearId,
            energy_annual_cost: energyAnnualCost,
            water_annual_cost: waterAnnualCost,
            phone_annual_cost: phoneAnnualCost,
            admin_annual_cost: adminAnnualCost,
            general_services_annual_cost: generalServicesAnnualCost
        });

        return newGlobalCost;
    }
}

export default IpressGlobalCostService;