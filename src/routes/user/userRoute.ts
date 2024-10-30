import { Request, Response, Router } from "express";
import { UserController } from "../../controllers/user/userController";


const app = Router();
const userController = new UserController();

app.post('/create/user', async (req: Request, res: Response): Promise<any> => await userController.createUser(req, res));
app.get('/user/id/:id', async (req: Request, res: Response): Promise<any> => await userController.getUserById(req, res));
app.get('/user/username/:username', async (req: Request, res: Response): Promise<any> => await userController.findUserByUsername(req, res));
app.put('/update/user/:id', async (req: Request, res: Response): Promise<any> => await userController.updateUserById(req, res));
app.delete('/user/:id', async (req: Request, res: Response): Promise<any> => await userController.deleteUserById(req, res));

module.exports = app;