import { EncrypterModel } from "../../models/encrypter/encrypterModel";
import { ResponseModel } from "../../models/response/responseModel";
import { TokenModel } from "../../models/token/tokenModel";
import { UserLoginModel } from "../../models/user/userModel";
import { UserRepository } from "../../repositories/user/userRepository";

export class LoginService {
    constructor(
        private userRepository: UserRepository,
        private encrypter: EncrypterModel,
        private authentication: TokenModel
    ){}
    async handle(user: UserLoginModel): Promise<ResponseModel> {
        if(!user.username || !user.password) return { status: 400, message: 'Usuário e Senha são campos obrigatórios.'}

        const usernameIsValid = await this.userRepository.findUserByUsername(user.username);

        if(!usernameIsValid) return { status: 404, message: 'Usuário ou Senha inválidos, tente novamente.' }

        const passwordIsValid = await this.encrypter.compare({ current: user.password, hash: usernameIsValid.password })

        if(!passwordIsValid) return { status: 404, message: 'Usuário ou Senha inválidos, tente novamente.' }

        const token = await this.authentication.generate({id: usernameIsValid.id, name: usernameIsValid.name});

        return { status: 200, data: { token: token } }
    }
}