import { FollowingModel } from "../../models/following/followingModel";
import { FollowingRepository } from "./followingRepository";


describe("Following Repository Tests", () => {
    const followingRepository = new FollowingRepository();
    const followingModel: FollowingModel = {
        id: '123',
        userId: '321',
        followingUsers: ['123', '321'],
        following: 2
    }

    test("Create following table", async () => {
        jest.spyOn(prisma.following, 'create')
        .mockImplementationOnce((): any => {
            {}
        })

        await followingRepository.createFollowingTable(followingModel)

        expect(prisma.following.create).toHaveBeenCalled();
    })

    test("Update following", async () => {
        jest.spyOn(prisma.following, 'update')
        .mockImplementationOnce((): any => {
            {}
        })

        await followingRepository.updateFollowing('123', ['123', '312', '432'], 1)

        expect(prisma.following.update).toHaveBeenCalled();
    })

    test("Get all followings", async () => {
        jest.spyOn(prisma.following, 'findUnique')
        .mockImplementationOnce((): any => {
            return followingModel
        })

        await followingRepository.getAllFollowing('123')

        expect(prisma.following.findUnique).toHaveBeenCalled();
    })

    test("Delete user following", async () => {
        jest.spyOn(prisma.following, 'delete').mockImplementationOnce((): any => {})

        await followingRepository.deleteFollowingTableByUserId('123');

        expect(prisma.following.delete).toHaveBeenCalled()
    })
})