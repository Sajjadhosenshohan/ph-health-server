import { User } from "@prisma/client";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (
    userData: Partial<User>,
    secret: string,
    expiresIn: string
  ): string => {
    const token = jwt.sign(
      userData as object, 
      secret,
      { expiresIn }
    );
    return token;
  };
  
const verifyToken = (token:string, secret:Secret)=> {
  return jwt.verify(token, secret) as JwtPayload;
}
export const jwtHelper = {
  generateToken,
  verifyToken
};
