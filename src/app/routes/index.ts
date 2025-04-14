import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import adminRoutes from "../modules/admin/admin.routes";
import AuthRouter from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/admin",
        route: adminRoutes
    },
    {
        path: "/auth",
        route: AuthRouter
    },
]

moduleRoutes.forEach((singleRoute) => router.use(singleRoute.path, singleRoute.route))

export default router;
