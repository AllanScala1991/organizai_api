export interface CreateTaskModel {
    id?: string
    userId: string
    weekDay: string
    title: string
    time: string
    priority: string
    isDone?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface TaskRespositoyModel {
    createTask(task: CreateTaskModel): Promise<CreateTaskModel>
    findTaskByWeekDay(weekDay: string, userId: string): Promise<CreateTaskModel[]>
    findTaskById(id: string): Promise<CreateTaskModel>
    findTaskByDone(userId: string): Promise<CreateTaskModel[]>
    updateTaskById(task: CreateTaskModel): Promise<CreateTaskModel>
    deleteTaskById(id: string): Promise<void>
}