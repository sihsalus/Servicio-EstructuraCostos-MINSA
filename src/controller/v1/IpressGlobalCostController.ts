import { Request, Response } from "express";
import IpressGlobalCostService from "@/services/GlobaCostService";
import CustomError from "@/utils/CustomError";

class IpressGlobalCostController {

    static async getByYear(req: Request<{ fiscalYearId: string }>, res: Response){
        try {
            const { fiscalYearId } = req.params;
            const globalCost = await IpressGlobalCostService.getByFiscalYear(parseInt(fiscalYearId, 10));

            if (!globalCost) {
                throw new CustomError(`No se encontraron gastos globales para el ID de año fiscal proporcionado`, 404);
            }

            res.status(200).json(globalCost);
            
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            console.error("Error en IpressGlobalCostController.getByYear:", error);
            res.status(500).json({ error: "Error interno al recuperar los gastos globales" });
        }
    }

    static async create(req: Request, res: Response){

        try {

            const newGlobalCost = await IpressGlobalCostService.createGlobalCost(req.body);
            res.status(201).json(newGlobalCost);

        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            console.error("Error en IpressGlobalCostController.create:", error);
            res.status(500).json({ error: "Error interno al registrar los gastos globales" });
        }
    }
}

export default IpressGlobalCostController;