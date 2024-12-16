import { Request, Response, Router } from "express";
import { ActivitieController } from "../../controllers/activities/activitieController";
import auth from "../../middlewares/auth/authentication";

const app = Router()
const activitieController = new ActivitieController();

app.get('/activitie/:userId', auth, async (req: Request, res: Response): Promise<any> => {
    await activitieController.findUserActivitie(req, res);
})

app.put("/activitie/:userId", auth, async(req: Request, res: Response): Promise<any> => {
    await activitieController.updateActivitieCompleted(req, res);
})

module.exports = app;