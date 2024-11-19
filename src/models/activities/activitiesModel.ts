export interface CreateActivitiesModel {
    id?: string
    userId: string
    activitiesCompleted?: number
    createdAt?: Date
    updatedAt?: Date
}

export interface ActivitiesRepositoryModel {
    createActivitie(activitie: CreateActivitiesModel): Promise<void>
    findActivitieByUserId(userId: string): Promise<CreateActivitiesModel>
    updatedActivitieCompleted(userId: string, activitiesCompleted: number): Promise<CreateActivitiesModel>
}