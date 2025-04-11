

export type TPagination = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
 export const calculatePagination = (options: TPagination) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";

    return {
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    };
  };





export const pick = <T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
    const finalObj: Partial<T> = {};

    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]
        }
    }

    console.log(finalObj)
    return finalObj;
}