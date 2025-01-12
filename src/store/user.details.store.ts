import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import UserRepository from '../repositories/user.repository.ts'

type UserDetailsActions = {
    getUserDetails: (onSuccess: (isSuccess: boolean) => void) => void
    updateUsername: (username: string, callback: (message: string) => void) => void
    updateName: (name: string, callback: (message: string) => void) => void
    updateBio: (bio: string, callback: (message: string) => void) => void
    updateProfilePicture: (
        profilePicture: File,
        callback: (updatedProfilePicture: string) => void
    ) => void
}

const useUserDetailsStore = create<UserDetailsActions>()(
    devtools(
        immer(() => ({
            getUserDetails: (onSuccess) => {
                // fetch user details from firebase
                // set user details
                //TODO implement this
                onSuccess(true)
            },
            updateUsername: (username, callback) => {
                // update username in firebase
                // set username
                UserRepository.updateUsername(username, callback)
            },
            updateName: (name, callback) => {
                // update name in firebase
                // set name
                UserRepository.updateName(name, callback)
            },
            updateBio: (bio, callback) => {
                // update bio in firebase
                // set bio
                UserRepository.updateBio(bio, callback)
            },
            updateProfilePicture: (profilePicture, callback) => {
                // update profile picture in firebase
                // set profile picture
                UserRepository.updateProfilePicture(profilePicture, callback)
            },
        }))
    )
)

export default useUserDetailsStore
