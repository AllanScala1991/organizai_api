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
        let followers = getAllFollowers.followers
        if(!followersId.includes(followerId)){
            followersId.push(followerId);
            followers += 1
        }
        await this.followerRepository.updateFollower(userId, followersId, followers);

        const getAllFollowings = await this.followingRepository.getAllFollowing(followerId);
        const followingsId = getAllFollowings.followingUsers;
        let following = getAllFollowings.following
        if(!followingsId.includes(userId)){
            followingsId.push(userId);
            following += 1
        }
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
        let followers = getAllFollowers.followers
        let index = followersId.indexOf(followerId)
        if(index !== -1) {
            followersId.splice(index, 1)
            followers -= 1
        }
        await this.followerRepository.updateFollower(userId, followersId, followers);

        const getAllFollowings = await this.followingRepository.getAllFollowing(followerId);
        const followingsId = getAllFollowings.followingUsers;
        let following = getAllFollowings.following
        let followingIndex = followingsId.indexOf(userId)
        if(followingIndex !== -1) {
            followingsId.splice(followingIndex, 1)
            following -= 1
        }
        await this.followingRepository.updateFollowing(followerId, followingsId, following);

        return { status: 200 }
    }

    async deleteFollowigAndFollowerTableByUserId(userId: string): Promise<void> {
        await this.followingRepository.deleteFollowingTableByUserId(userId);
        await this.followerRepository.deleteFollowerTableByUserId(userId);
    }
}