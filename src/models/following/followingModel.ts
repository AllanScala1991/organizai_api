export interface FollowingModel {
    id?: string
    userId: string
    followingUsers: string[]
    following?: number
    createdAt?: Date
}

export interface FollowingRepositoryModel {
    createFollowingTable(follower: FollowingModel): Promise<void>
    updateFollowing(userId: string, followingId: string[], following: number): Promise<void>
    getAllFollowing(userId: string): Promise<FollowingModel>
    deleteFollowingTableByUserId(userId: string): Promise<void>
}