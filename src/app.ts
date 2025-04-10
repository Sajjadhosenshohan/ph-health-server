import express from "express";
import { userRoutes } from "./app/modules/user/user.routes";
import adminRoutes from "./app/modules/admin/admin.routes";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

export default app;
