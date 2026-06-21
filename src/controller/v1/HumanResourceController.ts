import HumanResourceService from "@/services/HumanResourceService";
import { Request, Response } from "express";

class HumanResourceController{

    static async getAllRRhh(req:Request, res: Response){
        try{
            const rrhhs = await HumanResourceService.getAll();
            res.status(200).json(rrhhs);
        }catch(e){
            
        }
    }
}
export default HumanResourceController;