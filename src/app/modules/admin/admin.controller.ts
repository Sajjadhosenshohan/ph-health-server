import { Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.service";
import { adminSearchAbleFields } from "../const";
import { pick } from "../../shared/Pick";

type TJsonData<T> = {
  statusCode : number,
  success: boolean,
  message: string,
  meta?:{
    page: number,
    limit : number,
    total: number
  },
  data: T | T[] | undefined | null
}

const sendResponse = <T>(res:Response, jsonData:TJsonData<T>) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta,
    data: jsonData.data,
  });
}



const getAllFromDb = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminSearchAbleFields);
    const options = pick(req.query, ["page","limit","sortBy","sortOrder"]);


    const result = await AdminServices.getAllFromDb(filters,options);

    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "Retrieve all admin data successfully",
      meta: result.meta,
      data: result.data,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};

const getByIdFromDb = async (req: Request, res: Response) => {
  try {
    
    const result = await AdminServices.getByIdFromDb(req?.params?.id);

    res.status(200).json({
      success: true,
      message: "Retrieve  admin data successfully by id",
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


// update single  admin data by id
const updateFromDb = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await AdminServices.updateFromDb(id, req.body);

    res.status(200).json({
      success: true,
      message: "Update admin data successfully by id",
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


// deleted single  admin data by id
const deletedFromDb = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await AdminServices.deleteFromDb(id);

    res.status(200).json({
      success: true,
      message: "Deleted admin data successfully by id",
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


// soft deleted single  admin data by id
const softDeletedFromDb = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await AdminServices.softDeleteFromDb(id);

    res.status(200).json({
      success: true,
      message: "Deleted admin data successfully by id",
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
  getByIdFromDb,
  updateFromDb,
  deletedFromDb,
  softDeletedFromDb
};
