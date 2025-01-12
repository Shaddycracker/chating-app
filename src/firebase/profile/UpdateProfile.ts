import { doc, Firestore, setDoc } from 'firebase/firestore'
import { User } from 'firebase/auth'
import Utils from '../../utils/Utils.ts'
import { ErrorMessages } from '../../constants/ErrorMessages.ts'
import CrudUtils from '../../utils/CrudUtils.ts'
import { FirestoreCollections } from '../../constants/FireStoreCollections.ts'
import { UserConstants } from '../../constants/UserConstants.ts'
import { SuccessMessages } from '../../constants/SuccessMessages.ts'

class UpdateProfile {
    /**
     * Function to update the username of the user
     * @param firestore - Firestore instance
     * @param user - User instance
     * @param prevUsername - Previous username of the user
     * @param username - New username of the user
     * @param callback - Callback function to return the message
     * @constructor
     */
    static UpdateUsername(
        firestore: Firestore,
        user: User,
        prevUsername: string | null,
        username: string,
        callback: (message: string) => void
    ) {
        Utils.checkAvailableUsername(firestore, username, (isAvailable) => {
            if (!isAvailable) {
                callback(ErrorMessages.USERNAME_ALREADY_EXISTS)
                return
            }

            this.getDataFromUsernameDocument(firestore, prevUsername!, (userMap) => {
                if (userMap === null) {
                    callback(ErrorMessages.ERROR_UPDATING_USERNAME)
                    return
                }
                userMap[UserConstants.USERNAME] = username

                //create new document with username as document id
                this.createNewUsernameDocument(firestore, username, userMap, (isCreated) => {
                    if (!isCreated) {
                        callback(ErrorMessages.ERROR_UPDATING_USERNAME)
                        return
                    }
                    //delete previous username document
                    this.deletePreviousUsernameDocument(firestore, prevUsername!, (isDeleted) => {
                        if (!isDeleted) {
                            callback(ErrorMessages.ERROR_UPDATING_USERNAME)
                            return
                        }
                        //update uid collection
                        this.updateUIDCollection(firestore, user, username, (isUpdated) => {
                            if (isUpdated) {
                                callback(SuccessMessages.USERNAME_UPDATED_SUCCESSFULLY)
                            } else {
                                callback(ErrorMessages.ERROR_UPDATING_USERNAME)
                            }
                        })
                    })
                })
            })
        })
    }

    /**
     * PRIVATE FUNCTIONS POINTING TO CRUD UTILS
     */
    private static getDataFromUsernameDocument(
        firestore: Firestore,
        username: string,
        callback: (userMap: { [key: string]: any } | null) => void
    ) {
        CrudUtils.getFirestoreDocument(
            firestore,
            FirestoreCollections.USERS_COLLECTION,
            username,
            (userMap) => {
                callback(userMap)
            }
        )
    }

    private static createNewUsernameDocument(
        firestore: Firestore,
        username: string,
        userMap: { [key: string]: any },
        callback: (isSuccess: boolean) => void
    ) {
        CrudUtils.createFirestoreDocument(
            firestore,
            FirestoreCollections.USERS_COLLECTION,
            username,
            userMap,
            (isCreated) => {
                callback(isCreated)
            }
        )
    }

    private static deletePreviousUsernameDocument(
        firestore: Firestore,
        prevUsername: string,
        callback: (isDeleted: boolean) => void
    ) {
        CrudUtils.deleteFirestoreDocument(
            firestore,
            FirestoreCollections.USERS_COLLECTION,
            prevUsername,
            (isDeleted) => {
                callback(isDeleted)
            }
        )
    }

    private static updateUIDCollection(
        firestore: Firestore,
        user: User,
        username: string,
        callback: (isUpdated: boolean) => void
    ) {
        const data = {
            [UserConstants.USERNAME]: username,
        }

        CrudUtils.updateFirestoreDocument(
            firestore,
            FirestoreCollections.REGISTERED_IDS_COLLECTION,
            user.uid,
            data,
            (isUpdated) => {
                callback(isUpdated)
            }
        )
    }

    /**
     * Function to update name
     * @param firestore - Firestore instance
     * @param username - Username of the user
     * @param name - New name of the user
     * @param callback - Callback function to return the message
     * @constructor
     */
    static UpdateName(
        firestore: Firestore,
        username: string,
        name: string,
        callback: (message: string) => void
    ) {
        const data = {
            [UserConstants.NAME]: name,
        }

        const docRef = doc(firestore, FirestoreCollections.USERS_COLLECTION, username)
        setDoc(docRef, data, { merge: true })
            .then(() => {
                callback(SuccessMessages.NAME_UPDATED_SUCCESSFULLY)
            })
            .catch(() => {
                callback(ErrorMessages.ERROR_UPDATING_NAME)
            })
    }

    /**
     * Function to update bio
     * @param firestore
     * @param username
     * @param bio
     * @param callback
     * @constructor
     */
    static UpdateBio(
        firestore: Firestore,
        username: string,
        bio: string,
        callback: (message: string) => void
    ) {
        const data = {
            [UserConstants.BIO]: bio,
        }

        const docRef = doc(firestore, FirestoreCollections.USERS_COLLECTION, username)
        setDoc(docRef, data, { merge: true })
            .then(() => {
                callback(SuccessMessages.BIO_UPDATED_SUCCESSFULLY)
            })
            .catch(() => {
                callback(ErrorMessages.ERROR_UPDATING_BIO)
            })
    }

    static updateProfilePicture(
        firestore: Firestore,
        username: string,
        prevProfilePicture: string,
        profilePicture: string,
        callback: (message: string) => void
    ) {
        const data = {
            [UserConstants.PROFILE_IMAGE]: profilePicture,
        }

        const docRef = doc(firestore, FirestoreCollections.USERS_COLLECTION, username)
        setDoc(docRef, data, { merge: true })
            .then(() => {
                callback(SuccessMessages.PROFILE_PICTURE_UPDATED_SUCCESSFULLY)
            })
            .catch(() => {
                callback(ErrorMessages.ERROR_UPDATING_PROFILE_PICTURE)
            })

        // TODO update in chats
        // TODO update in groups
        console.log(prevProfilePicture)
    }
}

export default UpdateProfile
