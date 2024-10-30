import { CreateUserModel } from "../../models/user/userModel";
import { UserRepository } from "./userRepository"


describe("User Repository Tests", () => {
    const userRepository = new UserRepository();

    const userResponse = {
        id: "123456789",
        name: "Roberto dos Santos",
        username: "roberto123",
        password: "123456",
        photoUrl: "http://localhost:8080/photo.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    test("Create new user", async () => {
        jest.spyOn(prisma.user, "create").mockImplementationOnce((): any => userResponse)

        const createUser = await userRepository.createUser({
            name: "Roberto dos Santos",
            username: "roberto123",
            password: "123456",
            photoUrl: "http://localhost:8080/photo.jpg",
        })

        expect(createUser).toEqual(userResponse);
    })

    test("Get user by id", async () => {
        jest.spyOn(prisma.user, "findUnique").mockImplementationOnce((): any => userResponse)

        const user  = await userRepository.getUserById("123456789");

        expect(user).toEqual(userResponse);
    })

    test("Find user by username", async () => {
        jest.spyOn(prisma.user, "findUnique").mockImplementationOnce((): any => userResponse)

        const user  = await userRepository.findUserByUsername("roberto123");

        expect(user).toEqual(userResponse);
    })

    test("Update user by id", async () => { 
        jest.spyOn(prisma.user, "update").mockImplementationOnce((): any => {})

        await userRepository.updateUserById({
            name: "Roberto dos Santos",
            username: "roberto123",
            password: "123456",
            photoUrl: "http://localhost:8080/photo.jpg",
        }, "123456789");

        expect(prisma.user.update).toHaveBeenCalled();
    })

    test("Delete user by id", async () => {
        jest.spyOn(prisma.user, "delete").mockImplementationOnce((): any => {})

        await userRepository.deleteUserById("123456789");

        expect(prisma.user.delete).toHaveBeenCalled();
    })
})