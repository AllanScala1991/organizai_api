import { ActivitiesRepositoryModel, CreateActivitiesModel } from "../../models/activities/activitiesModel";
import prisma from "../../lib/prisma/prisma";

export class ActivitieRepository implements ActivitiesRepositoryModel {

    async createActivitie(activitie: CreateActivitiesModel): Promise<void> {
        await prisma.activities.create({
            data: activitie
        })
    }

    async findActivitieByUserId(userId: string): Promise<CreateActivitiesModel> {
        return await prisma.activities.findUnique({
            where: {
                userId: userId
            }
        })
    }

    async updatedActivitieCompleted(userId: string, activitiesCompleted: number): Promise<CreateActivitiesModel> {
        return await prisma.activities.update({
            where: {
                userId: userId
            }, data: {
                activitiesCompleted: activitiesCompleted
            }
        })
    }

    async deleteActivitieByUserId(userId: string): Promise<void> {
        await prisma.activities.delete({
            where: {
                userId: userId
            }
        })
    }

}