import SuppliesController from "@/controller/v1/SuppliesController";
import { Router } from "express";

const supplyRouter = Router();

supplyRouter.get("/",SuppliesController.getAllSupply);

export default supplyRouter;