import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";
import { adminSearchAbleFields } from "../const";
import { calculatePagination } from "../../shared/Pick";
import { prisma } from "../../shared/prisma";
import { TAdminOptions } from "../../interface/TPaginationOptions";
import { TAdminFilter } from "./admin.interface";

const getAllFromDb = async (params: TAdminFilter, options: TAdminOptions) => {
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

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single admin by id

const getByIdFromDb = async (id: string) => {
  const result = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

// update single  admin data by id

const updateFromDb = async (id: string, adminData: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
      isDeleted: false,
    },
    data: adminData,
  });
  return result;
};

// delete single admin from tables
const deleteFromDb = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (tran) => {
    const adminDeletedData = await tran.admin.delete({
      where: {
        id,
        isDeleted: false,
      },
    });
    const userDeleted = await tran.user.delete({
      where: {
        email: adminDeletedData.email,
        status: UserStatus.ACTIVE,
      },
    });

    return userDeleted;
  });
  return result;
};

// update  single admin data status  from tables
const softDeleteFromDb = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (tran) => {
    const adminDeletedData = await tran.admin.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });
    const userDeleted = await tran.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return userDeleted;
  });
  return result;
};

export const AdminServices = {
  getAllFromDb,
  getByIdFromDb,
  updateFromDb,
  deleteFromDb,
  softDeleteFromDb,
};
