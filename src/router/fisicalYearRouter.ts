import FisicalYearController from "@/controller/v1/FisicalYearControllers";
import { Router } from "express";

const fisicalYearRouter = Router();

fisicalYearRouter.get("/:year",FisicalYearController.getByYear);

export default fisicalYearRouter;