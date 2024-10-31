import { Request, Response, Router } from "express";
import { UserController } from "../../controllers/user/userController";
import auth from "../../middlewares/auth/authentication";


const app = Router();
const userController = new UserController();

app.post('/create/user', async (req: Request, res: Response): Promise<any> => await userController.createUser(req, res));
app.get('/user/id/:id', auth, async (req: Request, res: Response): Promise<any> => await userController.getUserById(req, res));
app.get('/user/username/:username', auth, async (req: Request, res: Response): Promise<any> => await userController.findUserByUsername(req, res));
app.put('/update/user/:id', auth, async (req: Request, res: Response): Promise<any> => await userController.updateUserById(req, res));
app.delete('/user/:id', auth, async (req: Request, res: Response): Promise<any> => await userController.deleteUserById(req, res));

module.exports = app;