import HumanResourceController from "@/controller/v1/HumanResourceController";
import { Router } from "express";

const rrhhRouter = Router();

rrhhRouter.get("/",HumanResourceController.getAllRRhh);

export default rrhhRouter;