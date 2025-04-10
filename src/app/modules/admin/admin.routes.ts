import { Router } from "express";
import { AdminController } from "./admin.controller";

const adminRoutes = Router();

adminRoutes.get("/", AdminController.getAllFromDb);

export default adminRoutes;