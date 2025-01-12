import BaseModel from './base.model.ts'
import { UserStatus } from '../enums/UserStatus.ts'

class UserModel extends BaseModel {
    uid: string
    username: string
    name: string
    profileImage: string
    bio: string
    status: UserStatus
    favourites: string[]
    fcmToken: string
    groups: string[]

    constructor(
        uid: string,
        username: string,
        name: string,
        profileImage: string,
        bio: string,
        status: UserStatus,
        favourites: string[],
        fcmToken: string,
        groups: string[]
    ) {
        super()
        this.uid = uid
        this.username = username
        this.name = name
        this.profileImage = profileImage
        this.bio = bio
        this.status = status
        this.favourites = favourites
        this.fcmToken = fcmToken
        this.groups = groups
    }
}

export default UserModel
