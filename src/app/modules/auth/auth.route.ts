import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRouter = Router();

AuthRouter.post("/login", AuthController.logInUser)
AuthRouter.post("/refresh-token", AuthController.refreshToken)

export default AuthRouter;