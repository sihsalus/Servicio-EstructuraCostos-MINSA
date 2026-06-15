import fisicalYearRouter from "@/router/fisicalYearRouter";
import { Router } from "express";

const v1Router = Router();

v1Router.use('/fisical-year',fisicalYearRouter);

v1Router.get("/gidis", (req, res) => {
    res.json({ status: "healthy", version: "v1" });
});

export default v1Router;