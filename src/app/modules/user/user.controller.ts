import { Request, Response } from "express";
import { UserServices } from "./user.service";

const CreateAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.CreateAdmin(req.body);

    res.status(200).json({
      success: true,
      message: "Admin is registered successfully",
      data: result
    });
  } catch (error:any) {
    res.status(500).json({
        success: false,
        message: error?.name || "Something went wrong",
        error
    });
  }
};

export const UserController = {
  CreateAdmin,
};
