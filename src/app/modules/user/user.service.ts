import { UserRole } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
const CreateAdmin = async (data: any) => {
  const hashedPassword =  await bcrypt.hash(data.password, 12);



  const userCreateData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async () => {
    await prisma.user.create({
      data: userCreateData,
    });

    const createdAdminData = await prisma.admin.create({
      data: data.admin,
    });

    return createdAdminData;
  });

  return result;
};

export const UserServices = {
  CreateAdmin,
};
