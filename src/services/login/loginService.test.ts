import { Bcrypt } from "../../lib/bcryptjs/bcryptjs"
import { JsonWebToken } from "../../lib/jsonwebtoken/jsonwebtoken"
import { UserRepository } from "../../repositories/user/userRepository"
import { LoginService } from "./loginService"


describe("Login Service Tests", () => {
    const userRepository = new UserRepository()
    const encrypter = new Bcrypt()
    const auth = new JsonWebToken()
    const loginService = new LoginService(userRepository, encrypter, auth)

    test("Login successfully", async () => {
        jest.spyOn(userRepository, 'findUserByUsername').mockImplementationOnce((): any => true);
        jest.spyOn(encrypter, "compare").mockImplementationOnce((): any => true);
        jest.spyOn(auth, 'generate').mockImplementationOnce((): any => 'token');

        const login = await loginService.handle({ username: 'test', password: 'test' });

        expect(login.status).toEqual(200);
        expect(login.data).not.toBeNull;
    })

    test("Login with send empty username to handle", async () => {
        const login = await loginService.handle({ username: '', password: 'test' });

        expect(login.status).toEqual(400);
        expect(login.message).toEqual('Usuário e Senha são campos obrigatórios.')
    })

    test("Login with send username invalid", async () => {
        jest.spyOn(userRepository, 'findUserByUsername').mockImplementationOnce((): any => false);

        const login = await loginService.handle({ username: 'invalid', password: 'test' });

        expect(login.status).toEqual(404);
        expect(login.message).toEqual('Usuário ou Senha inválidos, tente novamente.');
    })

    test("Login with send password invalid", async () => {
        jest.spyOn(userRepository, 'findUserByUsername').mockImplementationOnce((): any => true);
        jest.spyOn(encrypter, "compare").mockImplementationOnce((): any => false);

        const login = await loginService.handle({ username: 'test', password: 'invalid' });

        expect(login.status).toEqual(404);
        expect(login.message).toEqual('Usuário ou Senha inválidos, tente novamente.');
    })
})