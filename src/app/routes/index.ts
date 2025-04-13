import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import adminRoutes from "../modules/admin/admin.routes";

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
]

moduleRoutes.forEach((singleRoute) => router.use(singleRoute.path, singleRoute.route))

export default router;
