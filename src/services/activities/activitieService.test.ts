import { CreateActivitiesModel } from "../../models/activities/activitiesModel";
import { ActivitieRepository } from "../../repositories/activities/activitieRepository"
import { ActivitieService } from "./activitieService";


describe("Activitie Service Tests", () => {
    const activitieRepository = new ActivitieRepository();
    const activitieService = new ActivitieService(activitieRepository);
    const activitieModel: CreateActivitiesModel = {
        id: '123',
        userId: '321',
        activitiesCompleted: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    test("Create activitie", async () => {
        jest.spyOn(activitieRepository, 'createActivitie').mockImplementationOnce((): any => {})

        const activitie = await activitieService.createActivitie(activitieModel);

        expect(activitie.status).toEqual(201);
    })

    test("Send empty user id to create new activite", async () => {
        const activitie = await activitieService.createActivitie({userId: ""});

        expect(activitie.status).toEqual(400);
        expect(activitie.message).toEqual("ID de usuário inválido.")
    })

    test("Find user activities", async () => {
        jest.spyOn(activitieRepository, 'findActivitieByUserId').mockImplementationOnce((): any => {
            return activitieModel
        })

        const activitie = await activitieService.findUserActivitie('321');

        expect(activitie.status).toEqual(200);
        expect(activitie.data).not.toBeNull;
    })

    test("Send empty user id to find activities by user id", async () => {
        const activities = await activitieService.findUserActivitie('');

        expect(activities.status).toEqual(400);
        expect(activities.message).toEqual('ID de usuário inválido.');
    })

    test("Send invalid user id to find activities by user id", async () => {
        jest.spyOn(activitieRepository, 'findActivitieByUserId').mockImplementationOnce((): any => {
            return false
        })

        const activitie = await activitieService.findUserActivitie('333');

        expect(activitie.status).toEqual(404);
        expect(activitie.message).toEqual('Nenhum dado de conquista localizado.')
    })

    test("Update activitie completed", async () => {
        jest.spyOn(activitieRepository, 'findActivitieByUserId').mockImplementationOnce((): any => {
            return activitieModel
        })

        jest.spyOn(activitieRepository, 'updatedActivitieCompleted').mockImplementationOnce((): any => {
            activitieModel
        })

        const activitie = await activitieService.updateActivitieCompleted('321');

        expect(activitie.status).toEqual(200);
        expect(activitie.data).not.toBeNull;
    })

    test('Send empty user id to update activitie', async () => {
        const activitie = await activitieService.updateActivitieCompleted('');

        expect(activitie.status).toEqual(400);
        expect(activitie.message).toEqual('ID de usuário é obrigatório.')
    })

    test('Send invalid user id to update activitie', async () => {
        jest.spyOn(activitieRepository, 'findActivitieByUserId').mockImplementationOnce((): any => {
            false
        })

        const activite = await activitieService.updateActivitieCompleted('111');

        expect(activite.status).toEqual(404);
        expect(activite.message).toEqual('Dados de conquistas não localizado.')
    })
})