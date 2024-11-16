import { TaskRepository } from "./taskRepository"
import prisma from "../../lib/prisma/prisma"

describe("Task Repository Tests", () => {
    const taskRepository = new TaskRepository()
    const taskMock = {
        id: '123',
        userId: '321',
        weekDay: 'Segunda',
        title: 'Lavar carro',
        time: '16:00h',
        priority: 'alto',
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    test("Create task successfully", async () => {
        jest.spyOn(prisma.tasks, 'create').mockImplementationOnce((): any => {taskMock})

        await taskRepository.createTask(taskMock)

        expect(prisma.tasks.create).toHaveBeenCalled();
    })

    test("Find task by weekDay", async () => {
        jest.spyOn(prisma.tasks, 'findMany').mockImplementationOnce((): any => {[taskMock]})

        await taskRepository.findTaskByWeekDay('Segunda', '123')

        expect(prisma.tasks.findMany).toHaveBeenCalled();
    })

    test("Find task by id", async () => {
        jest.spyOn(prisma.tasks, 'findUnique').mockImplementationOnce((): any => {taskMock})

        await taskRepository.findTaskById('123')

        expect(prisma.tasks.findUnique).toHaveBeenCalled();
    })

    test("Find task by Done", async () => {
        jest.spyOn(prisma.tasks, 'findMany').mockImplementationOnce((): any => {[taskMock]})

        await taskRepository.findTaskByDone('321')

        expect(prisma.tasks.findMany).toHaveBeenCalled();
    })

    test("Update task by id", async () => {
        jest.spyOn(prisma.tasks, 'update').mockImplementationOnce((): any => {taskMock})

        await taskRepository.updateTaskById(taskMock)

        expect(prisma.tasks.update).toHaveBeenCalled();
    })

    test("Delete task by id", async () => {
        jest.spyOn(prisma.tasks, 'delete').mockImplementationOnce((): any => {})

        await taskRepository.deleteTaskById('123')

        expect(prisma.tasks.delete).toHaveBeenCalled();
    })
})