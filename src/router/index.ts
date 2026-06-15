import { Router } from "express";
import v1Router from "./rv1";

const rootRouter = Router();


rootRouter.use("/v1", v1Router);


export default rootRouter;