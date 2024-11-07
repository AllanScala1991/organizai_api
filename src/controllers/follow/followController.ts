import { Request, Response } from "express";
import { FollowerRepository } from "../../repositories/follower/followerRepository";
import { FollowingRepository } from "../../repositories/following/followingRepository";
import { FollowService } from "../../services/follow/followService";


export class FollowController {
    private followerRepository: FollowerRepository;
    private followingRepository: FollowingRepository;
    private followService: FollowService;

    constructor(){
        this.followerRepository = new FollowerRepository();
        this.followingRepository = new FollowingRepository();
        this.followService = new FollowService(this.followerRepository, this.followingRepository);
    }

    async followNewUser (req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const followerId = req.params.followerId;
            const response = await this.followService.followNewUser(userId, followerId);
            return res.status(response.status).json("")
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getAllFollowers (req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const response = await this.followService.getAllFollowers(userId);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getAllFollowings (req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const response = await this.followService.getAllFollowings(userId);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getTotalFollowersAndFollowings (req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const response = await this.followService.getTotalFollowersAndFollowings(userId);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async unfollowUser (req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const followerId = req.params.followerId;
            const response = await this.followService.unfollowUser(userId, followerId);
            return res.status(response.status).json("")
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}