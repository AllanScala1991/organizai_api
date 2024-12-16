import { ActivitieRepository } from "./activitieRepository"
import prisma from "../../lib/prisma/prisma";
import { CreateActivitiesModel } from "../../models/activities/activitiesModel";

describe("Activitie Repository Tests", () => {
    const activitieRepository = new ActivitieRepository();
    const activitieModel: CreateActivitiesModel = {
        id: '123',
        userId: '321',
        activitiesCompleted: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    
    test("Create activitie", async () => {
        jest.spyOn(prisma.activities, 'create').mockImplementationOnce((): any => {
            activitieModel
        })

        await activitieRepository.createActivitie(activitieModel);

        expect(prisma.activities.create).toHaveBeenCalled();
    })

    test("Find activitie by user id", async () => {
        jest.spyOn(prisma.activities, 'findUnique').mockImplementationOnce((): any => {
            activitieModel
        })

        await activitieRepository.findActivitieByUserId('321');

        expect(prisma.activities.findUnique).toHaveBeenCalled();
    })

    test("Update activitie completed", async () => {
        jest.spyOn(prisma.activities, 'update').mockImplementationOnce((): any => {
            activitieModel
        })

        await activitieRepository.updatedActivitieCompleted('321', 2);

        expect(prisma.activities.update).toHaveBeenCalled();
    })

    test("Delete user activitie", async () => {
        jest.spyOn(prisma.activities, 'delete').mockImplementationOnce((): any => {})

        await activitieRepository.deleteActivitieByUserId('123')

        expect(prisma.activities.delete).toHaveBeenCalled();
    })
})