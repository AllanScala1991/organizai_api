import { CreateUserModel } from "./userModel";

export interface UserRepositoryModel {
    createUser(user: CreateUserModel): Promise<CreateUserModel>
    getUserById(userId: string): Promise<CreateUserModel>
    findUserByUsername(username: string): Promise<CreateUserModel>
    updateUserById(user: CreateUserModel, userId: string): Promise<void>
    deleteUserById(userId: string): Promise<void>
}