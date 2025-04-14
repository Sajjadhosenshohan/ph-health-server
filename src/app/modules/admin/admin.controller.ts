import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";
import { adminSearchAbleFields } from "../const";
import { pick } from "../../shared/Pick";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const getAllFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filters = pick(req.query, adminSearchAbleFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  console.log("filters >>> ",filters)
  console.log("options >>> ",options)
  const result = await AdminServices.getAllFromDb(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Retrieve all admin data successfully",
    meta: result.meta,
    data: result.data,
  });
};

const getByIdFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await AdminServices.getByIdFromDb(req.params.id);
  res.status(200).json({
    success: true,
    message: "Retrieve admin data successfully by id",
    data: result,
  });
};

const updateFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await AdminServices.updateFromDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Update admin data successfully by id",
    data: result,
  });
};

const deletedFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await AdminServices.deleteFromDb(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Deleted admin data successfully by id",
    data: result,
  });
};

const softDeletedFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await AdminServices.softDeleteFromDb(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Soft deleted admin data successfully by id",
    data: result,
  });
};

export const AdminController = {
  getAllFromDb,
  getByIdFromDb,
  updateFromDb,
  deletedFromDb,
  softDeletedFromDb,
};
