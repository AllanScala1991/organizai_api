import { Request, Response } from "express";
import { TaskRepository } from "../../repositories/tasks/taskRepository";
import { TaskService } from "../../services/task/taskService";
import { CreateTaskModel } from "../../models/tasks/tasksModel";


export class TaskController {
    private taskRepository: TaskRepository
    private taskService: TaskService

    constructor(){
        this.taskRepository = new TaskRepository()
        this.taskService = new TaskService(this.taskRepository)
    }

    async createTask(req: Request, res: Response) {
        try {
            const body: CreateTaskModel = req.body;
    
            const response = await this.taskService.createTask(body);
    
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async findTaskByWeekDay(req: Request, res: Response) {
        try {
            const weekDay = req.params.weekDay;
            const userId = req.params.userId;
    
            const response = await this.taskService.findTaskByWeekDay(weekDay, userId);
    
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async findTaskById(req: Request, res: Response) {
        try {
            const id = req.params.id

            const response = await this.taskService.findTaskById(id);

            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async findTaskByDone(req: Request, res: Response) {
        try {
            
            const userId = req.params.userId

            const response = await this.taskService.findTaskByDone(userId)

            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async updateTaskById(req: Request, res: Response) {
        try {
            const body: CreateTaskModel = req.body;

            const response = await this.taskService.updateTaskById(body)

            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async deleteTaskById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const response = await this.taskService.deleteTaskById(id);

            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}