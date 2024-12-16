export interface UserLevelModel {
    id?: string
    userId: string
    currentLevel?: number
    currentLevelXp?: number
    nextLevelXp?: number
}

export interface UserLevelRepositoryModel {
    create(userLevel: UserLevelModel): Promise<void>
    findLevelByUserId(userId: string): Promise<UserLevelModel>
    updateUserLevel(userLevel: UserLevelModel): Promise<void>
    deleteUserLevel(userId: string): Promise<void>
}