export interface CreateUserModel {
    name: string
    username: string
    password: string
    photoUrl: string
    updatedAt?: Date
}

export interface UserLoginModel {
    username: string
    password: string
}