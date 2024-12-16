import { UserLevelModel, UserLevelRepositoryModel } from "../../models/level/userLevelModel";
import prisma from "../../lib/prisma/prisma";

export class UserLevelRepository implements UserLevelRepositoryModel {

    async create(userLevel: UserLevelModel): Promise<void> {
        await prisma.level.create({
            data: userLevel
        })
    }

    async findLevelByUserId(userId: string): Promise<UserLevelModel> {
        return await prisma.level.findUnique({
            where: {
                userId: userId
            }
        })
    }

    async updateUserLevel(userLevel: UserLevelModel): Promise<void> {
        await prisma.level.update({
            where: {
                id: userLevel.id
            },data: userLevel
        })
    }

    async deleteUserLevel(userId: string): Promise<void> {
        await prisma.level.delete({
            where: {
                userId: userId
            }
        })
    }
    
}