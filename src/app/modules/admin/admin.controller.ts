import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import { adminSearchAbleFields } from "../const";
import pick from "../../shared/Pick";

const getAllFromDb = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminSearchAbleFields);
    const options = pick(req.query, ["page","limit"]);


    const result = await AdminServices.getAllFromDb(filters,options);

    res.status(200).json({
      success: true,
      message: "Retrieve all admin data successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};

export const AdminController = {
  getAllFromDb,
};
