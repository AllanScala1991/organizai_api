import prisma from "../../lib/prisma/prisma";
import { CreateTaskModel, TaskRespositoyModel } from "../../models/tasks/tasksModel";

export class TaskRepository implements TaskRespositoyModel {

    async createTask(task: CreateTaskModel): Promise<CreateTaskModel> {
        return await prisma.tasks.create({
            data: task
        })
    }

    async findTaskByWeekDay(weekDay: string, userId: string): Promise<CreateTaskModel[]> {
        return await prisma.tasks.findMany({
            where: {
                weekDay: weekDay,
                userId: userId,
                isDone: false
            }
        })
    }

    async findTaskById(id: string): Promise<CreateTaskModel> {
        return await prisma.tasks.findUnique({
            where: {
                id: id
            }
        })
    }

    async findTaskByDone(userId: string): Promise<CreateTaskModel[]> {
        return await prisma.tasks.findMany({
            where: {
                isDone: true,
                userId: userId
            }
        })
    }

    async updateTaskById(task: CreateTaskModel): Promise<CreateTaskModel> {
        return await prisma.tasks.update({
            where: {
                id: task.id
            }, data: task
        })
    }

    async deleteTaskById(id: string): Promise<void> {
        await prisma.tasks.delete({
            where: {
                id: id
            }
        })
    }
    
}