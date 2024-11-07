import { Request, Response } from "express";
import { Bcrypt } from "../../lib/bcryptjs/bcryptjs";
import { EncrypterModel } from "../../models/encrypter/encrypterModel";
import { UserRepository } from "../../repositories/user/userRepository";
import { UserService } from "../../services/user/userService";
import { CreateUserModel } from "../../models/user/userModel";
import { UserLevelService } from "../../services/level/userLevelService";
import { UserLevelRepository } from "../../repositories/level/userLevelRepository";
import { FollowerRepository } from "../../repositories/follower/followerRepository";
import { FollowingRepository } from "../../repositories/following/followingRepository";


export class UserController {
    private userRepository: UserRepository
    private encrypter: EncrypterModel
    private userService: UserService
    private userLevelService: UserLevelService
    private userLevelRepository: UserLevelRepository
    private followerRepository: FollowerRepository
    private followingRepository: FollowingRepository

    constructor(){
        this.userRepository = new UserRepository();
        this.encrypter = new Bcrypt();
        this.userLevelRepository = new UserLevelRepository()
        this.followerRepository = new FollowerRepository()
        this.followingRepository = new FollowingRepository()
        this.userLevelService = new UserLevelService(this.userLevelRepository);
        this.userService = new UserService(
            this.encrypter, 
            this.userRepository, 
            this.userLevelService,
            this.followerRepository,
            this.followingRepository
        );
    }

    async createUser(req: Request, res: Response) {
        try {
            const user: CreateUserModel = req.body;
            const response = await this.userService.createUser(user);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await this.userService.getUserById(id);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async findUserByUsername(req: Request, res: Response) {
        try {
            const username = req.params.username;
            const response = await this.userService.findUserByUsername(username);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async updateUserById(req: Request, res: Response) {
        try {
            const user: CreateUserModel = req.body;
            const id = req.params.id;
            const response = await this.userService.updateUserById(user, id);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteUserById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await this.userService.deleteUSerById(id);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}