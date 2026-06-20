import CpmsService from "@/services/cpmsService";
import { Request, Response } from "express";

class MedicalProcedureController{

    static async getAllCPMS(req:Request, res: Response){
        try{
            const cpms = await CpmsService.getAll();
            res.status(200).json(cpms);
        }catch(e){

        }
    }
}
export default MedicalProcedureController;