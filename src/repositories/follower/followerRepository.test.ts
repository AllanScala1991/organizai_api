import prisma from "../../lib/prisma/prisma";
import { FollowersModel } from "../../models/followers/followersModel";
import { FollowerRepository } from "./followerRepository";

describe("Follower Repository Tests", () => {
    const followerRepository = new FollowerRepository();
    const followerModel: FollowersModel = {
        id: '123',
        userId: '321',
        followersUsers: ['123', '321'],
        followers: 2
    }

    test("Create follower table", async () => {
        jest.spyOn(prisma.followers, 'create')
        .mockImplementationOnce((): any => {
            {}
        })

        await followerRepository.createFollowerTable(followerModel)

        expect(prisma.followers.create).toHaveBeenCalled();
    })

    test("Update follower", async () => {
        jest.spyOn(prisma.followers, 'update')
        .mockImplementationOnce((): any => {
            {}
        })

        await followerRepository.updateFollower('123', ['123', '312', '432'], 1)

        expect(prisma.followers.update).toHaveBeenCalled();
    })

    test("Get all followers", async () => {
        jest.spyOn(prisma.followers, 'findUnique')
        .mockImplementationOnce((): any => {
            return followerModel
        })

        await followerRepository.getAllFollowers('123')

        expect(prisma.followers.findUnique).toHaveBeenCalled();
    })

    test("Delete user follower", async () => {
        jest.spyOn(prisma.followers, 'delete').mockImplementationOnce((): any => {})

        await followerRepository.deleteFollowerTableByUserId('123');

        expect(prisma.followers.delete).toHaveBeenCalled();
    })
})