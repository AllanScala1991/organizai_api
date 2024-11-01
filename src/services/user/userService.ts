import { EncrypterModel } from "../../models/encrypter/encrypterModel";
import { ResponseModel } from "../../models/response/responseModel";
import { CreateUserModel } from "../../models/user/userModel";
import { UserRepository } from "../../repositories/user/userRepository";
import { UserLevelService } from "../level/userLevelService";

export class UserService {
    constructor(
         private encrypter: EncrypterModel,
         private userRepository: UserRepository,
         private userLevelService: UserLevelService
    ){}

    async createUser(user: CreateUserModel): Promise<ResponseModel> {
        for(let index in user) {
            if(!user[index]){
                return { status: 400, message: 'Todos os campos devem ser preenchidos.' }
            }
        }

        const usernameExists = await this.userRepository.findUserByUsername(user.username);

        if(usernameExists) return { status: 400, message: 'Já existe um usuário cadastrado com esses dados.' }

        const passwordHashed = await this.encrypter.encrypt({salt: 8, value: user.password});

        user.password = passwordHashed;

        const createdUser = await this.userRepository.createUser(user);
        
        delete createdUser.password

        await this.userLevelService.createLevel({ userId: createdUser.id});

        return { status: 201, data: createdUser}
    }

    async getUserById(userId: string): Promise<ResponseModel> {
        if(!userId) return { status: 400, message: 'ID de usuário inválido.' }

        const user = await this.userRepository.getUserById(userId);

        if(!user) return { status: 404, message: 'Usuário não localizado.' };

        delete user.password

        const userLevel = await this.userLevelService.findUserLevel(userId);

        return { status: 200, data: { user, userLevel } }
    }

    async findUserByUsername(username: string): Promise<ResponseModel> {
        if (!username) return { status: 404, message: 'Usuário não localizado.' }

        const user = await this.userRepository.findUserByUsername(username);

        if(!user) return { status: 404, message: 'Usuário não localizado.' }
        
        delete user.password

        return { status: 200, data: user }
    }

    async updateUserById(user: CreateUserModel, userId: string): Promise<ResponseModel> {
        for(let index in user) {
            if(!user[index]) {
                return { status: 400, message: 'Todos os campos devem ser preenchidos.' }
            }
        }

        if(!userId) return { status: 400, message: 'ID de usuário inválido.' }

        const userExists = await this.userRepository.getUserById(userId);

        if(!userExists) return { status: 404, message: "Usuário não localizado." }

        user.updatedAt = new Date()

        await this.userRepository.updateUserById(user, userId);

        return { status: 200, message: 'Informações do usuário atualizadas com sucesso.' }
    }

    async deleteUSerById(userId: string): Promise<ResponseModel> {
        if(!userId) return { status: 400, message: 'ID de usuário inválido.' }

        const userExists = await this.userRepository.getUserById(userId);

        if(!userExists) return { status: 404, message: "Usuário não localizado ou já foi deletado." }

        await this.userRepository.deleteUserById(userId)

        return { status: 200, message: 'Usuário deletado com sucesso.' }
    }
    
}