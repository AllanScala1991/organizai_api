import { FollowersModel } from "../../models/followers/followersModel"
import { FollowingModel } from "../../models/following/followingModel"
import { FollowerRepository } from "../../repositories/follower/followerRepository"
import { FollowingRepository } from "../../repositories/following/followingRepository"
import { FollowService } from "./followService"


describe("Follow Service Tests", () => {
    const followerRepository = new FollowerRepository()
    const followingRepository = new FollowingRepository()
    const followService = new FollowService(followerRepository, followingRepository)
    const followerModel: FollowersModel = {
        id: '123',
        userId: '321',
        followersUsers: ['123'],
        followers: 2
    }

    const followingModel: FollowingModel = {
        id: '123',
        userId: '321',
        followingUsers: ['321'],
        following: 2
    }

    test("Follow new user", async () => {
        jest.spyOn(followerRepository, 'getAllFollowers')
        .mockImplementationOnce((): any => followerModel)

        jest.spyOn(followerRepository, 'updateFollower')
        .mockImplementationOnce((): any => {})

        jest.spyOn(followingRepository, 'getAllFollowing')
        .mockImplementationOnce((): any => followingModel)

        jest.spyOn(followingRepository, 'updateFollowing')
        .mockImplementationOnce((): any => {})

        const follow = await followService.followNewUser('123', '321')

        expect(follow.status).toEqual(200);
    })

    test("Send empty user id", async () => {
        const follow = await followService.followNewUser('', '321')

        expect(follow.status).toEqual(400);
        expect(follow.message).toEqual('ID de Usuário ou de Seguidor inválido.');
    })

    test("Get all followers", async () => {
        jest.spyOn(followerRepository, 'getAllFollowers')
        .mockImplementationOnce((): any => followerModel)

        const allFollowers = await followService.getAllFollowers('123');

        expect(allFollowers.status).toEqual(200);
        expect(allFollowers.data).not.toBeNull;
    })

    test("Send empty id to get all followers", async () => {
        const allFollowers = await followService.getAllFollowers('');

        expect(allFollowers.status).toEqual(400);
        expect(allFollowers.message).toEqual('ID de Usuário inválido.');
    })

    test("Get all followings", async () => {
        jest.spyOn(followingRepository, 'getAllFollowing')
        .mockImplementationOnce((): any => followingModel)

        const allFollowings = await followService.getAllFollowings('123');

        expect(allFollowings.status).toEqual(200);
        expect(allFollowings.data).not.toBeNull;
    })

    test("Send empty user id to get all followings", async () => {
        const allFollowings = await followService.getAllFollowings('');

        expect(allFollowings.status).toEqual(400);
        expect(allFollowings.message).toEqual('ID de Usuário inválido.');
    })

    test("Get total followers and followings", async () => {
        jest.spyOn(followerRepository, 'getAllFollowers')
        .mockImplementationOnce((): any => followerModel)

        jest.spyOn(followingRepository, 'getAllFollowing')
        .mockImplementationOnce((): any => followingModel)

        const totalFollow = await followService.getTotalFollowersAndFollowings('123');

        expect(totalFollow.status).toEqual(200);
        expect(totalFollow.data).not.toBeNull;
    })

    test("Send empty id to get total followers and followings", async () => {
        const totalFollow = await followService.getTotalFollowersAndFollowings('');

        expect(totalFollow.status).toEqual(400);
        expect(totalFollow.message).toEqual('ID de Usuário inválido.');
    })

    test("Unfollow user", async () => {
        jest.spyOn(followerRepository, 'getAllFollowers')
        .mockImplementationOnce((): any => followerModel)

        jest.spyOn(followerRepository, 'updateFollower')
        .mockImplementationOnce((): any => {})

        jest.spyOn(followingRepository, 'getAllFollowing')
        .mockImplementationOnce((): any => followingModel)

        jest.spyOn(followingRepository, 'updateFollowing')
        .mockImplementationOnce((): any => {})

        const unfollow = await followService.unfollowUser('123', '321')

        expect(unfollow.status).toEqual(200);
    })

    test("Send empty user id to unfollow user", async () => {
        const unfollow = await followService.unfollowUser('', '321')

        expect(unfollow.status).toEqual(400);
        expect(unfollow.message).toEqual('ID de Usuário ou de Seguidor inválido.');
    })

    test("Delete user follower and following", async () => {
        jest.spyOn(followerRepository, 'deleteFollowerTableByUserId').mockImplementationOnce((): any => {})
        jest.spyOn(followingRepository, 'deleteFollowingTableByUserId').mockImplementationOnce((): any => {})

        await followService.deleteFollowigAndFollowerTableByUserId('123');

        expect(followerRepository.deleteFollowerTableByUserId).toHaveBeenCalled();
        expect(followingRepository.deleteFollowingTableByUserId).toHaveBeenCalled();
    })
})