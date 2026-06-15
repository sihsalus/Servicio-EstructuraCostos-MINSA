import CostStructureConst from "@/const/CostStructureConst";
import { CreateMedicalProcedureInput, CreateMedicalProcedureSchema } from "@/interfaces/cpms";
import MedicalProcedureModel from "@/models/coststructure/MedicalProcedureModel";
import CustomError from "@/utils/CustomError";

class CpmsService{

    static  async createCPMS(data: CreateMedicalProcedureInput){
        const validation = CreateMedicalProcedureSchema.safeParse(data);
        if (!validation.success) {
            throw new CustomError("Formato de equipamiento inválido", 400);
        }

        const { name,cpmsCode, createdBy } = validation.data;

        const existing = await MedicalProcedureModel.findOne({ where: { name } });
        if (existing) return existing;

        return await MedicalProcedureModel.create({
            cpms_code: cpmsCode,
            name,
            created_by: createdBy ?? CostStructureConst.DEFAULT_USER_SYSTEM
        });        
    }
}
export default CpmsService;