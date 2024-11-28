import { Bcrypt } from "../../lib/bcryptjs/bcryptjs"
import { ActivitieRepository } from "../../repositories/activities/activitieRepository";
import { FollowerRepository } from "../../repositories/follower/followerRepository";
import { FollowingRepository } from "../../repositories/following/followingRepository";
import { UserLevelRepository } from "../../repositories/level/userLevelRepository";
import { UserRepository } from "../../repositories/user/userRepository"
import { ActivitieService } from "../activities/activitieService";
import { UserLevelService } from "../level/userLevelService";
import { UserService } from "./userService";


describe("User Service Tests", () => {
    const userRepository = new UserRepository()
    const encrypter = new Bcrypt();
    const userLevelRepository = new UserLevelRepository()
    const userLevelService = new UserLevelService(userLevelRepository);
    const followerRepository = new FollowerRepository();
    const followingRepository = new FollowingRepository();
    const activitieRepository = new ActivitieRepository();
    const activitieService = new ActivitieService(activitieRepository)
    const userService = new UserService(encrypter, userRepository, userLevelService, followerRepository, followingRepository, activitieService);
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
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce((): any => false);
        jest.spyOn(encrypter, "encrypt").mockImplementationOnce((): any => "ajs627ngda72b");
        jest.spyOn(userRepository, "createUser").mockImplementationOnce((): any => userResponse);
        jest.spyOn(userLevelService, 'createLevel').mockImplementationOnce((): any => {});
        jest.spyOn(followerRepository, 'createFollowerTable').mockImplementationOnce((): any => {});
        jest.spyOn(followingRepository, 'createFollowingTable').mockImplementationOnce((): any => {});
        jest.spyOn(activitieRepository, 'createActivitie').mockImplementationOnce((): any => {});

        const createNewUser = await userService.createUser({
            name: "Roberto dos Santos",
            username: "roberto123",
            password: "123456",
            photoUrl: "http://localhost:8080/photo.jpg"
        })

        expect(createNewUser.status).toEqual(201);
        expect(createNewUser.data).not.toBeNull;
    })

    test("Send invalid payload to create new user", async () => {
        const sendInvalidPayload = await userService.createUser({
            name: "",
            username: "roberto123",
            password: "123456",
            photoUrl: "http://localhost:8080/photo.jpg"
        });

        expect(sendInvalidPayload.status).toEqual(400);
        expect(sendInvalidPayload.message).toEqual("Todos os campos devem ser preenchidos.")
    })

    test("Send duplicated username to create new user", async () => {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce((): any => true);
        
        const createNewUser = await userService.createUser({
            name: "Roberto dos Santos",
            username: "roberto123",
            password: "123456",
            photoUrl: "http://localhost:8080/photo.jpg"
        })

        expect(createNewUser.status).toEqual(400);
        expect(createNewUser.message).toEqual("Já existe um usuário cadastrado com esses dados.");
    })

    test("Get user by ID", async () => {
        jest.spyOn(userRepository, "getUserById").mockImplementationOnce((): any => userResponse);
        jest.spyOn(userLevelService, 'findUserLevel').mockImplementationOnce((): any => {});

        const getUserById = await userService.getUserById("123456789");

        expect(getUserById.status).toEqual(200);
        expect(getUserById.data).not.toBeNull;
    })

    test("Send not exists user ID to function get user by id", async () => {
        jest.spyOn(userRepository, "getUserById").mockImplementationOnce((): any => false);

        const getUserById = await userService.getUserById("444345678");

        expect(getUserById.status).toEqual(404);
        expect(getUserById.message).toEqual("Usuário não localizado.");
    })

    test("Send invalid id to function get user by id", async () => {
        const getUserById = await userService.getUserById("");

        expect(getUserById.status).toEqual(400);
        expect(getUserById.message).toEqual("ID de usuário inválido.");
    })

    test("Find user by username", async () => {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce((): any => userResponse);

        const getUserByUsername = await userService.findUserByUsername("roberto123");

        expect(getUserByUsername.status).toEqual(200);
        expect(getUserByUsername.data).not.toBeNull;
    })

    test("Send empty username to function get user by username", async () => {
        const getUserByUsername = await userService.findUserByUsername("");

        expect(getUserByUsername.status).toEqual(404);
        expect(getUserByUsername.message).toEqual("Usuário não localizado.");
    })

    test("Send not exists username to function get user by username", async () => {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce((): any => false);
        
        const getUserByUsername = await userService.findUserByUsername("robert");

        expect(getUserByUsername.status).toEqual(404);
        expect(getUserByUsername.message).toEqual("Usuário não localizado.");
    })

    test("Update user by id", async () => {
        jest.spyOn(userRepository, "updateUserById").mockImplementationOnce((): any => userResponse);
        jest.spyOn(userRepository, "getUserById").mockImplementationOnce((): any => true)

        const updateUserById = await userService.updateUserById({
            name: "Roberto dos Santos",
            username: "roberto123",
            password: "123456",
            photoUrl: "http://localhost:8080/photo.jpg"
        }, "123456789");

        expect(updateUserById.status).toEqual(200);
        expect(updateUserById.message).toEqual("Informações do usuário atualizadas com sucesso.")
    })

    test("Send emtpy payload to function update user by id", async () => {
        const updateUserById = await userService.updateUserById({
            name: "",
            username: "roberto123",
            password: "123456",
            photoUrl: "http://localhost:8080/photo.jpg"
        }, "123456789");

        expect(updateUserById.status).toEqual(400);
        expect(updateUserById.message).toEqual("Todos os campos devem ser preenchidos.")
    })

    test("Send empty id to function update user by id", async () => {
        const updateUserById = await userService.updateUserById({
            name: "Roberto dos Santos",
            username: "roberto123",
            password: "123456",
            photoUrl: "http://localhost:8080/photo.jpg"
        }, "");

        expect(updateUserById.status).toEqual(400);
        expect(updateUserById.message).toEqual("ID de usuário inválido.")
    })

    test("Send not exists user id to function update user by id", async () => {
        jest.spyOn(userRepository, "updateUserById").mockImplementationOnce((): any => userResponse);
        jest.spyOn(userRepository, "getUserById").mockImplementationOnce((): any => false)

        const updateUserById = await userService.updateUserById({
            name: "Roberto dos Santos",
            username: "roberto123",
            password: "123456",
            photoUrl: "http://localhost:8080/photo.jpg"
        }, "3234556");

        expect(updateUserById.status).toEqual(404);
        expect(updateUserById.message).toEqual("Usuário não localizado.")
    })

    test("Delete user by id", async () => {
        jest.spyOn(userRepository, "getUserById").mockImplementationOnce((): any => userResponse);
        jest.spyOn(userRepository, "deleteUserById").mockImplementationOnce((): any => true);

        const deleteUserById = await userService.deleteUSerById("123456789");

        expect(deleteUserById.status).toEqual(200);
        expect(deleteUserById.message).toEqual("Usuário deletado com sucesso.");
    })

    test("Send empty user id to function delete user by id", async () => {
        const deleteUserById = await userService.deleteUSerById("");

        expect(deleteUserById.status).toEqual(400);
        expect(deleteUserById.message).toEqual("ID de usuário inválido.");
    })

    test("send not exists user id to function delete user by id", async () => {
        jest.spyOn(userRepository, "getUserById").mockImplementationOnce((): any => false);

        const deleteUserById = await userService.deleteUSerById("33333333");

        expect(deleteUserById.status).toEqual(404);
        expect(deleteUserById.message).toEqual("Usuário não localizado ou já foi deletado.");
    })
})