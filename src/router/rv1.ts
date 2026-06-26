import costRouter from "@/router/costStructureRouter";
import equipRouter from "@/router/equipmentRouter";
import fisicalYearRouter from "@/router/fisicalYearRouter";
import globalCostRouter from "@/router/globalCostRouter";
import infraRouter from "@/router/infraRouter";
import rrhhRouter from "@/router/rrhhRouter";
import supplyRouter from "@/router/supplyRouter";
import { Router } from "express";

const v1Router = Router();

v1Router.use('/fisyear',fisicalYearRouter);
v1Router.use("/infrastructure",infraRouter);
v1Router.use("/equipment",equipRouter);
v1Router.use("/supplie",supplyRouter);
v1Router.use("/rrhh",rrhhRouter);
v1Router.use("/global-costs", globalCostRouter);
v1Router.use("/cost-structures",costRouter);


v1Router.get("/gidis", (req, res) => {
    res.json({ status: "healthy", version: "v1" });
});

export default v1Router;