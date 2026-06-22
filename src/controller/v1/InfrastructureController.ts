import InfrastructureService from "@/services/InfrastructureService";
import CustomError from "@/utils/CustomError";
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

    static async saveConfig(req: Request, res: Response): Promise<void> {
        try {
            const config = await InfrastructureService.createOrUpdateConfig(req.body);
            res.status(200).json(config);
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            console.error("Error en InfrastructureController.saveConfig:", error);
            res.status(500).json({ error: "Error interno al guardar los pesos de la UPSS" });
        }
    }

    static async runProrrateo(req: Request<{ fiscalYearId: string }>, res: Response): Promise<void> {
        try {
            const { fiscalYearId } = req.params;
            const result = await InfrastructureService.executeProrrateo(parseInt(fiscalYearId, 10));
            res.status(200).json(result);
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            console.error("Error en InfrastructureController.runProrrateo:", error);
            res.status(500).json({ error: "Error interno al ejecutar el prorrateo institucional" });
        }
    }
}

export default InfrastructureController;