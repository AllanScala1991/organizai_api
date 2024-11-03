import { UserLevelModel } from "../../models/level/userLevelModel";
import { UserLevelRepository } from "../../repositories/level/userLevelRepository"
import { UserLevelService } from "./userLevelService";
import prisma from "../../lib/prisma/prisma";

describe("User Level Service Tests", () => {
    const userLevelRespository = new UserLevelRepository();
    const userLevelService = new UserLevelService(userLevelRespository);
    const userLevelModel: UserLevelModel = {
        id: '123',
        userId: '321',
        currentLevel: 1,
        currentLevelXp: 2,
        nextLevelXp: 10
    }

    test("Create new level user successfully", async () => {
        jest.spyOn(userLevelRespository, 'findLevelByUserId')
        .mockImplementationOnce((): any => false);

        jest.spyOn(userLevelRespository, 'create')
        .mockImplementationOnce((): any => {});

        const levelUser = await userLevelService.createLevel(userLevelModel);

        expect(levelUser).toEqual(true);
    })

    test("Try create duplicated level", async () => {
        jest.spyOn(userLevelRespository, 'findLevelByUserId')
        .mockImplementationOnce((): any => true);

        const levelUser = await userLevelService.createLevel(userLevelModel);

        expect(levelUser).toEqual(false);
    })

    test("Find user level", async () => {
        jest.spyOn(userLevelRespository, 'findLevelByUserId')
        .mockImplementationOnce((): any => userLevelModel);

        const userLevel = await userLevelService.findUserLevel('123');

        expect(userLevel).not.toBeNull;
        expect(userLevel.id).toEqual('123');
    })

    test("Update user level with current xp equal next xp", async () => {
        const userUpdateCurrentXp: UserLevelModel = {
            id: '123',
            userId: '321',
            currentLevel: 1,
            currentLevelXp: 9,
            nextLevelXp: 10
        }

        jest.spyOn(userLevelRespository, 'findLevelByUserId')
        .mockImplementationOnce((): any => userUpdateCurrentXp);

        jest.spyOn(userLevelRespository, 'updateUserLevel')
        .mockImplementationOnce((): any => {})

        const userLevelUpdate = await userLevelService.updateUserLevel('123');

        expect(userLevelUpdate.status).toEqual(200);
    })

    test("Update user level with current xp greater than next xp", async () => {
        const userUpdateCurrentXp: UserLevelModel = {
            id: '123',
            userId: '321',
            currentLevel: 1,
            currentLevelXp: 10,
            nextLevelXp: 10
        }

        jest.spyOn(userLevelRespository, 'findLevelByUserId')
        .mockImplementationOnce((): any => userUpdateCurrentXp);

        jest.spyOn(userLevelRespository, 'updateUserLevel')
        .mockImplementationOnce((): any => {})

        const userLevelUpdate = await userLevelService.updateUserLevel('123');

        expect(userLevelUpdate.status).toEqual(200);
    })

    test("Update user level with current xp less than next xp", async () => {
        const userUpdateCurrentXp: UserLevelModel = {
            id: '123',
            userId: '321',
            currentLevel: 1,
            currentLevelXp: 2,
            nextLevelXp: 10
        }

        jest.spyOn(userLevelRespository, 'findLevelByUserId')
        .mockImplementationOnce((): any => userUpdateCurrentXp);

        jest.spyOn(userLevelRespository, 'updateUserLevel')
        .mockImplementationOnce((): any => {})

        const userLevelUpdate = await userLevelService.updateUserLevel('123');

        expect(userLevelUpdate.status).toEqual(200);
    })

    test("Error to search user level", async () => {
        jest.spyOn(userLevelRespository, 'findLevelByUserId')
        .mockImplementationOnce((): any => false);

        const userLevelUpdate = await userLevelService.updateUserLevel('123');

        expect(userLevelUpdate.status).toEqual(404);
        expect(userLevelUpdate.message).toEqual('Erro ao localizar o nível do usuário.')
    })
})