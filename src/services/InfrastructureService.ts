import CostStructureConst from "@/const/CostStructureConst";
import { CreateInfrastructureInput, CreateInfrastructureSchema } from "@/interfaces/infra";
import InfrastructureModel from "@/models/infrastructure/InfrastructureModel";
import CustomError from "@/utils/CustomError";

class InfrastructureService{

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
}
export default InfrastructureService;