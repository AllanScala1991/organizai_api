import { FollowingModel, FollowingRepositoryModel } from "../../models/following/followingModel";
import prisma from "../../lib/prisma/prisma";

export class FollowingRepository implements FollowingRepositoryModel {
    async createFollowingTable(following: FollowingModel): Promise<void> {
        await prisma.following.create({
            data: following
        })
    }

    async updateFollowing(userId: string, followingId: string[], folowing: number): Promise<void> {
        await prisma.following.update({
            where: {
                userId: userId
            }, data: {
                followingUsers: {
                    set: followingId
                },
                following: folowing
            }
        })
    }

    async getAllFollowing(userId: string): Promise<FollowingModel> {
        return await prisma.following.findUnique({
            where: {
                userId: userId
            }
        })
    }
    
}