import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleFields } from "../const";
import { calculatePagination } from "../../shared/Pick";
import { prisma } from "../../shared/prisma";

const getAllFromDb = async (params: any, options: any) => {
  
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  return result;
};

export const AdminServices = {
  getAllFromDb,
};
