import MedicalProcedureController from "@/controller/v1/MedicalProcedureController";
import { Router } from "express";

const cpmsRouter = Router();

cpmsRouter.get('/',MedicalProcedureController.getAllCPMS);

export default cpmsRouter;