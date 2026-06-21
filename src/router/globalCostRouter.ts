import IpressGlobalCostController from "@/controller/v1/IpressGlobalCostController";
import { Router } from "express";

const globalCostRouter = Router();
globalCostRouter.get("/year/:fiscalYearId", IpressGlobalCostController.getByYear);
globalCostRouter.post("/", IpressGlobalCostController.create);

export default globalCostRouter;

