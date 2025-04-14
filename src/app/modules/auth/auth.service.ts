import { User, UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import  { jwtHelper } from "../../utils/jwtHelper";
import { TAuthLogin } from "./auth.interface";
import bcrypt from "bcryptjs";
const loginUser = async (payload: TAuthLogin) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isUser = await bcrypt.compare(payload.password, userData?.password);

  if (!isUser) {
    throw new Error("Password is incorrect");
  }

  const accessToken = jwtHelper.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    process.env.JWT_SECRET as string,
    "1h"
  );

  const refreshToken = jwtHelper.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    process.env.JWT_REFRESH_SECRET as string,
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async(token:string)=> {
    let decodedData;
    try {
        decodedData = jwtHelper.verifyToken(token,process.env.JWT_REFRESH_SECRET as string);
      } catch(err) {
        throw new Error("You are not authorized!")
      }
    const userData = await prisma.user.findUniqueOrThrow({
        where:{
            email: decodedData?.email,
            status: UserStatus.ACTIVE
        }
    })

    const accessToken = jwtHelper.generateToken(
        {
          email: userData?.email,
          role: userData?.role,
        },
        process.env.JWT_SECRET as string,
        "1h"
      );

      return {
        accessToken,
        needPasswordChange: userData!.needPasswordChange,
      };
}
export const AuthService = {
  loginUser,
  refreshToken
};
