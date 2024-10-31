import { Request, Response, Router } from "express";
import { LoginController } from "../../controllers/login/loginController";


const app = Router()
const loginController = new LoginController();

app.post('/login', async (req: Request, res: Response): Promise<any> => await loginController.handle(req, res));

module.exports = app;