import SupplyService from "@/services/SupplyService";
import { Request, Response } from "express";

class SuppliesController{

    static async getAllSupply(req:Request, res: Response){
        try{
            const supplies = await SupplyService.getAll();
            res.status(200).json(supplies);
        }catch(e){

        }
    }
}

export default SuppliesController;