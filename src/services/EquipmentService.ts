import CostStructureConst from "@/const/CostStructureConst";
import { CreateEquipmentInput, CreateEquipmentSchema } from "@/interfaces/equipment";
import EquipmentModel from "@/models/equipment/EquipmentModel";

import CustomError from "@/utils/CustomError";

class EquipmentService {
    static async createEquipment(data: CreateEquipmentInput) {
        const validation = CreateEquipmentSchema.safeParse(data);
        if (!validation.success) {
            throw new CustomError("Formato de equipamiento inválido", 400);
        }

        const { name, description, typeEquipment, usefulLifeYears, sigaCode, isGroupAsset, createdBy } = validation.data;

        const existing = await EquipmentModel.findOne({ where: { name } });
        if (existing) return existing;

        return await EquipmentModel.create({
            name,
            description: description || '',
            type_equipment: typeEquipment,
            useful_life_years: usefulLifeYears,
            siga_code: sigaCode || null,
            is_group_asset: isGroupAsset || false,
            created_by: createdBy ?? CostStructureConst.DEFAULT_USER_SYSTEM
        });
    }
}

export default EquipmentService;