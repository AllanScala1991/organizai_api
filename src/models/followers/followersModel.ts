export interface FollowersModel {
    id?: string
    userId: string
    followersUsers: string[]
    followers?: number
    createdAt?: Date
}

export interface FollowersRepositoryModel {
    createFollowerTable(follower: FollowersModel): Promise<void>
    updateFollower(userId: string, followersId: string[], followers: number): Promise<void>
    getAllFollowers(userId: string): Promise<FollowersModel>
}