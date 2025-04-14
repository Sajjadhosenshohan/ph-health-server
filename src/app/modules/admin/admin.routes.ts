import { NextFunction, Request, Response, Router } from "express";
import { AdminController } from "./admin.controller";
import validationSchema from "../../utils/validationSchema";
import { adminDataValidation } from "./admin.validation";

const adminRoutes = Router();


adminRoutes.get("/", AdminController.getAllFromDb);
adminRoutes.get("/:id", AdminController.getByIdFromDb);
adminRoutes.patch("/:id",validationSchema(adminDataValidation.updateAdminSchema), AdminController.updateFromDb);
adminRoutes.delete("/:id", AdminController.deletedFromDb);
adminRoutes.patch("/soft/:id", AdminController.softDeletedFromDb);

export default adminRoutes;