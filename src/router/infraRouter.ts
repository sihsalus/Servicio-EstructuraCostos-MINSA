import InfrastructureController from "@/controller/v1/InfrastructureController";
import { Router } from "express";

const infraRouter = Router();

infraRouter.get("/",InfrastructureController.getAllUpss);
infraRouter.post("/:id",InfrastructureController.getInfraById);
infraRouter.post("/config",InfrastructureController.saveConfig);
infraRouter.post("/porrateo/year/:fiscalYearId",InfrastructureController.runProrrateo);


export default infraRouter;