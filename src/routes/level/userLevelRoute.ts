import { Request, Response, Router } from "express";
import { UserLevelController } from "../../controllers/level/userLevelController";


const app = Router();
const userLevelController = new UserLevelController();

app.put("/user/level/:id", async (req: Request, res: Response): Promise<any> => await userLevelController.updateUserLevel(req, res));

module.exports = app;