import { Router } from "express";
import { AdminController } from "./admin.controller";

const adminRoutes = Router();

adminRoutes.get("/", AdminController.getAllFromDb);
adminRoutes.get("/:id", AdminController.getByIdFromDb);
adminRoutes.patch("/:id", AdminController.updateFromDb);
adminRoutes.delete("/:id", AdminController.deletedFromDb);
adminRoutes.patch("/soft/:id", AdminController.softDeletedFromDb);

export default adminRoutes;