import { Request, Response, Router } from "express";
import { TaskController } from "../../controllers/tasks/tasksController";
import auth from "../../middlewares/auth/authentication";

const app = Router()
const taskController = new TaskController()

app.post('/task', auth, async(req: Request, res: Response): Promise<any> => await taskController.createTask(req, res));
app.get('/task/week/:weekDay/:userId', auth, async(req: Request, res: Response): Promise<any> => await taskController.findTaskByWeekDay(req, res));
app.get('/task/:id', auth, async(req: Request, res: Response): Promise<any> => await taskController.findTaskById(req, res));
app.get('/task/done/:userId', auth, async(req: Request, res: Response): Promise<any> => await taskController.findTaskByDone(req, res));
app.put('/task', auth, async(req: Request, res: Response): Promise<any> => await taskController.updateTaskById(req, res));
app.delete('/task/:id', auth, async(req: Request, res: Response): Promise<any> => await taskController.deleteTaskById(req, res));

module.exports = app;