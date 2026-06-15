import CostStructureConst from "@/const/CostStructureConst";
import { CreateHumanResourceInput, CreateHumanResourceSchema } from "@/interfaces/humanResource";
import HumanResourceModel from "@/models/rrhh/HumanResourceModel";
import CustomError from "@/utils/CustomError";

class HumanResourceService {

    static async createHumanResource(data : CreateHumanResourceInput){
        const validation = CreateHumanResourceSchema.safeParse(data);

        if (!validation.success) {
            throw new CustomError("Formato de HumanResource inválido", 400);
        }

        const { speciality, createdBy } = validation.data;

        const existingHhrr = await HumanResourceModel.findOne({
            where: {speciality}
        });

        if(existingHhrr) return existingHhrr;

        return await HumanResourceModel.create({
            speciality,
            createdBy: createdBy ?? CostStructureConst.DEFAULT_USER_SYSTEM
        });
    }
}

export default HumanResourceService;