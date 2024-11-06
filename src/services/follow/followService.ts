import { ResponseModel } from "../../models/response/responseModel";
import { FollowerRepository } from "../../repositories/follower/followerRepository";
import { FollowingRepository } from "../../repositories/following/followingRepository";


export class FollowService {
    constructor(
        private followerRepository: FollowerRepository,
        private followingRepository: FollowingRepository
    ){}

    async followNewUser(userId: string, followerId: string): Promise<ResponseModel> {
        if(!userId || !followerId) return { status: 400, message: 'ID de Usuário ou de Seguidor inválido.' };

        const getAllFollowers = await this.followerRepository.getAllFollowers(userId);
        const followersId = getAllFollowers.followersUsers;
        followersId.push(followerId);
        const followers = getAllFollowers.followers + 1;
        await this.followerRepository.updateFollower(userId, followersId, followers);

        const getAllFollowings = await this.followingRepository.getAllFollowing(followerId);
        const followingsId = getAllFollowings.followingUsers;
        followingsId.push(userId);
        const following = getAllFollowings.following + 1
        await this.followingRepository.updateFollowing(followerId, followingsId, following);

        return { status: 200 }
    }

    async getAllFollowers(userId: string): Promise<ResponseModel> {
        if(!userId) return { status: 400, message: 'ID de Usuário inválido.' }

        const followers = (await this.followerRepository.getAllFollowers(userId)).followersUsers;

        return { status: 200, data: { seguindo: followers } }
    }

    async getAllFollowings(userId: string): Promise<ResponseModel> {
        if(!userId) return { status: 400, message: 'ID de Usuário inválido.' }

        const followings = (await this.followingRepository.getAllFollowing(userId)).followingUsers;

        return { status: 200, data: { seguidores: followings } }
    }

    async getTotalFollowersAndFollowings(userId: string): Promise<ResponseModel> {
        if(!userId) return { status: 400, message: 'ID de Usuário inválido.' }

        const followers = (await this.followerRepository.getAllFollowers(userId)).followers;
        const followings = (await this.followingRepository.getAllFollowing(userId)).following;

        return { status: 200, data: { seguindo: followers, seguidores: followings} }
    }

    async unfollowUser(userId: string, followerId: string): Promise<ResponseModel> {
        if(!userId || !followerId) return { status: 400, message: 'ID de Usuário ou de Seguidor inválido.' };

        const getAllFollowers = await this.followerRepository.getAllFollowers(userId);
        const followersId = getAllFollowers.followersUsers;
        const updatedFollowers = followersId.filter(item => item !== followerId)
        const followers = getAllFollowers.followers - 1;
        await this.followerRepository.updateFollower(userId, updatedFollowers, followers);

        const getAllFollowings = await this.followingRepository.getAllFollowing(followerId);
        const followingsId = getAllFollowings.followingUsers;
        const updatedFollowings = followingsId.filter(item => item !== userId)
        const following = getAllFollowings.following - 1
        await this.followingRepository.updateFollowing(followerId, updatedFollowings, following);

        return { status: 200 }
    }
}