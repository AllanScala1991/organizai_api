import { Request, Response } from "express";
import { Bcrypt } from "../../lib/bcryptjs/bcryptjs";
import { JsonWebToken } from "../../lib/jsonwebtoken/jsonwebtoken";
import { EncrypterModel } from "../../models/encrypter/encrypterModel";
import { TokenModel } from "../../models/token/tokenModel";
import { UserLoginModel } from "../../models/user/userModel";
import { UserRepository } from "../../repositories/user/userRepository";
import { LoginService } from "../../services/login/loginService";


export class LoginController {
    private loginService: LoginService
    private userRepository: UserRepository
    private encrypter: EncrypterModel
    private authentication: TokenModel

    constructor(){
        this.userRepository = new UserRepository()
        this.encrypter = new Bcrypt()
        this.authentication = new JsonWebToken()
        this.loginService = new LoginService(this.userRepository, this.encrypter, this.authentication)
    }

    async handle(req: Request, res: Response) {
        try {
            const user: UserLoginModel = req.body;
            const response = await this.loginService.handle(user);
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}