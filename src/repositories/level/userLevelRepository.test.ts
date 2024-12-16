import { UserLevelRepository } from "./userLevelRepository"
import prisma from "../../lib/prisma/prisma";
import { UserLevelModel } from "../../models/level/userLevelModel";

describe("User level repository tests", () => {
    const userLevelRepository = new UserLevelRepository();
    const userLevelModel: UserLevelModel = {
        id: '321',
        userId: '123',
        currentLevel: 2,
        currentLevelXp: 8,
        nextLevelXp: 10
    }

    test("Create new user level repository", async () => {
        jest.spyOn(prisma.level, "create").mockImplementationOnce((): any => {});

        await userLevelRepository.create(userLevelModel);

        expect(prisma.level.create).toHaveBeenCalled();
    })

    test("Find level by user id", async () => {
        jest.spyOn(prisma.level, "findUnique").mockImplementationOnce((): any => userLevelModel);

        const userLevel = await userLevelRepository.findLevelByUserId('321');

        expect(userLevel).not.toBeNull;
        expect(userLevel.id).toEqual('321');
    })

    test("Update user level", async () => {
        jest.spyOn(prisma.level, "update").mockImplementationOnce((): any => {});

        await userLevelRepository.updateUserLevel(userLevelModel);

        expect(prisma.level.update).toHaveBeenCalled();
    })

    test("Delete user level", async () => {
        jest.spyOn(prisma.level, 'delete').mockImplementationOnce((): any => {})

        await userLevelRepository.deleteUserLevel('123')

        expect(prisma.level.delete).toHaveBeenCalled()
    })
})