import EquipmentService from "@/services/EquipmentService";
import { Request, Response } from "express";

class EquipmentController{

    static async getAllEquipment(req:Request, res: Response){
        try{
            const equips = await EquipmentService.getAll();
            res.status(200).json(equips);
        }catch(e){
            
        }
    }
}

export default EquipmentController;