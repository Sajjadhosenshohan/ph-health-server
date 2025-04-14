import { Response } from "express";

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


export default sendResponse;

