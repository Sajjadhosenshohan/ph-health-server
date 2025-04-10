import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-admin", UserController.CreateAdmin)

export const userRoutes = router;