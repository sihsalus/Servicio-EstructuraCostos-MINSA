import { Request, Response } from "express";
import CostStructureService from "@/services/CostStructureService";
import CustomError from "@/utils/CustomError";

class CostStructureController {

    static async getRecipe(req: Request<{ cpmsCode: string }>, res: Response): Promise<void> {
        try {
            const { cpmsCode } = req.params;
            const { fiscalYearId } = req.query;

            if (!fiscalYearId) {
                throw new CustomError("El parámetro de consulta obligatoria 'fiscalYearId' no fue proporcionado", 400);
            }

            const recipe = await CostStructureService.getFullRecipeByCpms(
                cpmsCode, 
                parseInt(fiscalYearId as string, 10)
            );
            
            res.status(200).json(recipe);
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            console.error("Error de ejecución en CostStructureController.getRecipe:", error);
            res.status(500).json({ error: "Error interno del servidor al recuperar la estructura de costos estándar" });
        }
    }

    /**
     * POST /api/v1/cost-structures
     */
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const newStructure = await CostStructureService.createCostStructure(req.body);
            res.status(201).json(newStructure);
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            console.error("Error de ejecución en CostStructureController.create:", error);
            res.status(500).json({ error: "Error interno del servidor al almacenar la estructura de costos detallada" });
        }
    }
}

export default CostStructureController;