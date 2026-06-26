import CostStructureController from "@/controller/v1/CostStructureController";
import { Router } from "express";

const costRouter = Router();

costRouter.post("/",CostStructureController.create);

export default costRouter;