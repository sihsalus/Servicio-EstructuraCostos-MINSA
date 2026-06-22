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

        const { medicalProcedureId, fiscalYearId, totalTimeMinutes, totalStandarCost } = parsed.data;

        const existing = await CostStructureModel.findOne({
            where: { medical_procedure_id: medicalProcedureId, fiscal_year_id: fiscalYearId }
        });

        if (existing) {
            throw new CustomError("Ya existe una estructura de costos base para este procedimiento en el año seleccionado", 409);
        }

        return await CostStructureModel.create({
            medical_procedure_id: medicalProcedureId,
            fiscal_year_id: fiscalYearId,
            total_time_minutes: totalTimeMinutes,
            total_standar_cost: totalStandarCost
        });
    }
}

export default CostStructureService;