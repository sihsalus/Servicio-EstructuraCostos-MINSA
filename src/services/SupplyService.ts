import CostStructureConst from "@/const/CostStructureConst";
import { CreateSupplyInput, CreateSupplySchema } from "@/interfaces/supply";
import SupplyModel from "@/models/supply/SupplyModel";
import CustomError from "@/utils/CustomError";

class SupplyService {

    static async getAll(){
        return SupplyModel.findAll();
    }

    static async createSupply(data: CreateSupplyInput) {
        const validation = CreateSupplySchema.safeParse(data);
        if (!validation.success) {
            throw new CustomError("Formato de insumo inválido", 400);
        }

        const { sigaCode, name, type, consumptionUnit, createdBy } = validation.data;

        const existing = await SupplyModel.findOne({ where: { name } });
        if (existing) return existing;

        return await SupplyModel.create({
            siga_code: sigaCode || null,
            name,
            type,
            consumption_unit: consumptionUnit,
            created_by: createdBy ?? CostStructureConst.DEFAULT_USER_SYSTEM
        });
    }
}

export default SupplyService;