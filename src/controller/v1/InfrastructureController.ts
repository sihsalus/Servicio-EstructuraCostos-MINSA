import InfrastructureService from "@/services/InfrastructureService";
import { Request, Response } from "express";
class InfrastructureController{

    static async getAllUpss(req: Request,res:Response){
        try{
            const infras = await InfrastructureService.getAll();
            res.status(200).json(infras);
        }catch(e){

        }
    }
    static async getInfraById(req: Request<{id: number}>, res:Response){
        try{
            const {id} = req.params;
            const infra = InfrastructureService.findById(id);
            res.status(200).json(infra);
        }
        catch(e){

        }
    }
}

export default InfrastructureController;