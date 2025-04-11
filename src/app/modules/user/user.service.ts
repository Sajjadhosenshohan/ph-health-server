import {  UserRole } from "@prisma/client"
import { prisma } from "../../shared/prisma"

const CreateAdmin = async(data:any)=>{
    console.log(data)

    const userCreateData = {
        email: data.admin.email,
        password: data.password,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async()=>{
        await prisma.user.create({
            data: userCreateData
        })

        const createdAdminData = await prisma.admin.create({
            data: data.admin
        })

        return createdAdminData
    })

    return result;
}

export const UserServices = {
    CreateAdmin
}