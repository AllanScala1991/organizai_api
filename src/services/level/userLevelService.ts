import { UserLevelModel } from "../../models/level/userLevelModel";
import { ResponseModel } from "../../models/response/responseModel";
import { UserLevelRepository } from "../../repositories/level/userLevelRepository";


export class UserLevelService {
    constructor(
        private userLevelRepository: UserLevelRepository
    ){}

    async createLevel(userLevel: UserLevelModel): Promise<boolean> {
        const levelExists = await this.userLevelRepository.findLevelByUserId(userLevel.userId);

        if (levelExists) return false;

        await this.userLevelRepository.create(userLevel);

        return true;
    }

    async findUserLevel(userId: string): Promise<UserLevelModel> {
        return await this.userLevelRepository.findLevelByUserId(userId);
    }

    async updateUserLevel(userId: string): Promise<ResponseModel> {
        const user = await this.findUserLevel(userId);
        user.currentLevelXp += 1

        if(user.currentLevelXp == user.nextLevelXp) {
            user.currentLevelXp = 0
            user.currentLevel += 1
            await this.userLevelRepository.updateUserLevel(user)
            const userLevelUpdated = await this.findUserLevel(userId)
            return { status: 200, data: userLevelUpdated }
        }

        if(user.currentLevelXp > user.nextLevelXp) {
            const currentXp = user.currentLevelXp - user.nextLevelXp;
            user.currentLevelXp = currentXp
            user.currentLevel += 1
            await this.userLevelRepository.updateUserLevel(user)
            const userLevelUpdated = await this.findUserLevel(userId)
            return { status: 200, data: userLevelUpdated }
        }

        await this.userLevelRepository.updateUserLevel(user)
        const userLevelUpdated = await this.findUserLevel(userId)
        return { status: 200, data: userLevelUpdated }
    }

}