import InfrastructureController from "@/controller/v1/InfrastructureController";
import { Router } from "express";

const infraRouter = Router();

infraRouter.get("/",InfrastructureController.getAllUpss);

export default infraRouter;