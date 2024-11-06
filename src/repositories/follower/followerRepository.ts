import { FollowersModel, FollowersRepositoryModel } from "../../models/followers/followersModel";
import prisma from "../../lib/prisma/prisma";

export class FollowerRepository implements FollowersRepositoryModel {
    async createFollowerTable(follower: FollowersModel): Promise<void> {
        await prisma.followers.create({
            data: follower
        })
    }

    async updateFollower(userId: string, followersId: string[], followers: number): Promise<void> {
        await prisma.followers.update({
            where: {
                userId: userId
            }, data: {
                followersUsers: {
                    set: followersId
                },
                followers: followers
            }
        })
    }

    async getAllFollowers(userId: string): Promise<FollowersModel> {
        return await prisma.followers.findUnique({
            where: {
                userId: userId
            }
        })
    }
    
}