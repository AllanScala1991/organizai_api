import { CreateUserModel } from "../../models/user/userModel";
import { UserRepositoryModel } from "../../models/user/userRepositoryModel";
import prisma from "../../lib/prisma/prisma";

export class UserRepository implements UserRepositoryModel {

    async createUser(user: CreateUserModel): Promise<CreateUserModel> {
        return await prisma.user.create({
            data: user
        })
    }

    async getUserById(userId: string): Promise<CreateUserModel> {
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async findUserByUsername(username: string): Promise<CreateUserModel> {
        return await prisma.user.findUnique({
            where: {
                username: username
            }
        })
    }

    async updateUserById(user: CreateUserModel, userId: string): Promise<void> {
        await prisma.user.update({
            where: {
                id: userId
            }, data : user
        })
    }

    async deleteUserById(userId: string): Promise<void> {
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
    }

}