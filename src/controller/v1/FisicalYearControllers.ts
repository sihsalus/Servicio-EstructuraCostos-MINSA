import FiscalYearService from "@/services/FiscalYearService";
import { Request, Response } from "express";

class FisicalYearController {

    static async getByYear(req: Request, res:Response){
        try{
            const {year} = req.params;

            const fiscalYear = await FiscalYearService.getByYear(parseInt(year,10));
            
            if(!fiscalYear){
                res.status(404);
                return;
            }
            res.status(200).json(fiscalYear);
        }catch(error){

        }
    }
}

export default FisicalYearController;