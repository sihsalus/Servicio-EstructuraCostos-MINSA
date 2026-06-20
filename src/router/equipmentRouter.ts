import EquipmentController from "@/controller/v1/EquipmentController";
import { Router } from "express";

const equipRouter = Router();

equipRouter.get('/',EquipmentController.getAllEquipment);

export default equipRouter;