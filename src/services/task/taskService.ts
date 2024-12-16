import { empty } from "@prisma/client/runtime/library";
import { ResponseModel } from "../../models/response/responseModel";
import { CreateTaskModel } from "../../models/tasks/tasksModel";
import { TaskRepository } from "../../repositories/tasks/taskRepository";


export class TaskService {
    constructor(
        private taskRepository: TaskRepository
    ){}

    async createTask(task: CreateTaskModel): Promise<ResponseModel> {
        for(let index in task) {
            if (task[index] === "") {
                return { status: 400, message: 'Todos os campos devem ser preenchidos.' }
            }
        }

        const taskCreated = await this.taskRepository.createTask(task);

        return { status: 201, data: taskCreated }
    }

    async findTaskByWeekDay(weekDay: string, userId: string): Promise<ResponseModel> {
        if(!weekDay || !userId) return { status: 400, message: 'Dados inválidos, tente novamente.' }

        const getTask = await this.taskRepository.findTaskByWeekDay(weekDay, userId);

        return { status: 200, data: getTask }
    }

    async findTaskById(id: string): Promise<ResponseModel> {
        if(!id) return { status: 400, message: 'ID inválido, tente novamente.' }

        const getTask = await this.taskRepository.findTaskById(id);

        if(!getTask) return { status: 404, message: 'Tarefa não localizada.' }

        return { status: 200, data: getTask }
    }

    async findTaskByDone(userId: string): Promise<ResponseModel> {
        if(!userId) return { status: 400, message: 'ID inválido, tente novamente.' }

        const getTask = await this.taskRepository.findTaskByDone(userId);
        
        return { status: 200, data: getTask }
    }

    async updateTaskById(task: CreateTaskModel): Promise<ResponseModel> {
        for(let index in task) {
            if (!task[index]) {
                return { status: 400, message: 'Todos os campos devem ser preenchidos.' }
            }
        }

        const taskExists = await this.taskRepository.findTaskById(task.id);

        if(!taskExists) return { status: 404, message: 'Tarefa não localizada.' }

        const getUpdatedTask = await this.taskRepository.updateTaskById(task);

        return { status: 200, data: getUpdatedTask }
    }

    async deleteTaskById(id: string): Promise<ResponseModel> {
        if(!id) return { status: 400, message: 'ID inválido, tente novamente.' }

        const taskExists = await this.taskRepository.findTaskById(id);

        if(!taskExists) return { status: 404, message: 'Tarefa não localizada.' }

        await this.taskRepository.deleteTaskById(id);

        return{ status: 200, message: 'Tarefa deletada com sucesso.' }
    }
}