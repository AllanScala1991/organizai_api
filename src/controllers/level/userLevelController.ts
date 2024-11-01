import { Request, Response } from "express";
import { UserLevelRepository } from "../../repositories/level/userLevelRepository";
import { UserLevelService } from "../../services/level/userLevelService";


export class UserLevelController {
    private userLevelRepository: UserLevelRepository
    private userLevelService: UserLevelService

    constructor() {
        this.userLevelRepository = new UserLevelRepository()
        this.userLevelService = new UserLevelService(this.userLevelRepository);
    }

    async updateUserLevel(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const response = await this.userLevelService.updateUserLevel(userId);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}