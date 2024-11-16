import { CreateTaskModel } from "../../models/tasks/tasksModel";
import { TaskRepository } from "../../repositories/tasks/taskRepository";
import { TaskService } from "./taskService";


describe("Task Service Tests", () => {
    const taskRepository = new TaskRepository();
    const taskService = new TaskService(taskRepository);
    const taskMock: CreateTaskModel = {
        id: '123',
        userId: '321',
        title: 'test',
        time: '16:00h',
        priority: 'alta',
        weekDay: 'segunda-feira',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    test("Create new task", async () => {
        jest.spyOn(taskRepository, 'createTask')
        .mockImplementationOnce((): any => taskMock);

        const task = await taskService.createTask(taskMock);

        expect(task.status).toEqual(201);
        expect(task.data).not.toBeNull;
    })

    test("Send empty payload item to create a new task", async () => {
        const emptyPayload: CreateTaskModel = {
            id: '123',
            userId: '321',
            title: '',
            time: '16:00h',
            priority: 'alta',
            weekDay: 'segunda-feira',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const task = await taskService.createTask(emptyPayload);

        expect(task.status).toEqual(400);
        expect(task.message).toEqual('Todos os campos devem ser preenchidos.');
    })

    test('Find task by weekday', async () => {
        jest.spyOn(taskRepository, 'findTaskByWeekDay')
        .mockImplementationOnce((): any => [taskMock]);

        const task = await taskService.findTaskByWeekDay('segunda-feira', '321');

        expect(task.status).toEqual(200);
        expect(task.data).not.toBeNull;
    })

    test('Send empty user id to find task by weekday', async () => {
        const task = await taskService.findTaskByWeekDay('segunda-feira', '');

        expect(task.status).toEqual(400);
        expect(task.message).toEqual('Dados inválidos, tente novamente.');
    })

    test('Find task by id', async () => {
        jest.spyOn(taskRepository, 'findTaskById')
        .mockImplementationOnce((): any => taskMock);

        const task = await taskService.findTaskById('123');

        expect(task.status).toEqual(200);
        expect(task.data).not.toBeNull;
    })

    test('Send empty id to find task by id', async () => {
        const task = await taskService.findTaskById('');

        expect(task.status).toEqual(400);
        expect(task.message).toEqual('ID inválido, tente novamente.');
    })

    test('Send invalid id to find task by id', async () => {
        jest.spyOn(taskRepository, 'findTaskById')
        .mockImplementationOnce((): any => false);

        const task = await taskService.findTaskById('333');

        expect(task.status).toEqual(404);
        expect(task.message).toEqual('Tarefa não localizada.')
    })

    test('Find task by status done', async () => {
        jest.spyOn(taskRepository, 'findTaskByDone')
        .mockImplementationOnce((): any => taskMock);

        const task = await taskService.findTaskByDone('321');

        expect(task.status).toEqual(200);
        expect(task.data).not.toBeNull;
    })

    test('Send empty user id to find task by status done', async () => {
        const task = await taskService.findTaskByDone('');

        expect(task.status).toEqual(400);
        expect(task.message).toEqual('ID inválido, tente novamente.');
    })

    test('Update task by id', async () => {
        jest.spyOn(taskRepository, 'findTaskById')
        .mockImplementationOnce((): any => taskMock);

        jest.spyOn(taskRepository, 'updateTaskById')
        .mockImplementationOnce((): any => taskMock);

        const task = await taskService.updateTaskById(taskMock);

        expect(task.status).toEqual(200);
        expect(task.data).not.toBeNull;
    })

    test('Send empty payload item to update task by id', async () => {
        const emptyPayload: CreateTaskModel = {
            id: '123',
            userId: '321',
            title: '',
            time: '16:00h',
            priority: 'alta',
            weekDay: 'segunda-feira',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const task = await taskService.updateTaskById(emptyPayload);

        expect(task.status).toEqual(400);
        expect(task.message).toEqual('Todos os campos devem ser preenchidos.');
    })

    test('Send invalid task id to update task by id', async () => {
        const invalidTaskId: CreateTaskModel = {
            id: '999',
            userId: '321',
            title: 'test',
            time: '16:00h',
            priority: 'alta',
            weekDay: 'segunda-feira',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        jest.spyOn(taskRepository, 'findTaskById')
        .mockImplementationOnce((): any => false)

        const task = await taskService.updateTaskById(invalidTaskId);

        expect(task.status).toEqual(404);
        expect(task.message).toEqual('Tarefa não localizada.');
    })

    test('Delete task by id', async () => {
        jest.spyOn(taskRepository, 'findTaskById')
        .mockImplementationOnce((): any => taskMock);

        jest.spyOn(taskRepository, 'deleteTaskById')
        .mockImplementationOnce((): any => {});

        const task = await taskService.deleteTaskById('123');

        expect(task.status).toEqual(200);
        expect(task.message).toEqual('Tarefa deletada com sucesso.');
    })

    test('Send empty task id to delete task by id', async () => {
        const task = await taskService.deleteTaskById('');

        expect(task.status).toEqual(400);
        expect(task.message).toEqual('ID inválido, tente novamente.');
    })

    test('Send invalid task id to delete task by id', async () => {
        jest.spyOn(taskRepository, 'findTaskById')
        .mockImplementationOnce((): any => false);

        const task = await taskService.deleteTaskById('444');

        expect(task.status).toEqual(404);
        expect(task.message).toEqual('Tarefa não localizada.');
    })
})