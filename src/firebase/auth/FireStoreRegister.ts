import { User } from 'firebase/auth'
import { FirestoreCollections } from '../../constants/FireStoreCollections.ts'
import Utils from '../../utils/Utils.ts'
import UserModel from '../../models/user.model.ts'
import { UserStatus } from '../../enums/UserStatus.ts'
import { doc, setDoc, Firestore } from 'firebase/firestore'
import CrudUtils from '../../utils/CrudUtils.ts'
import { UserConstants } from '../../constants/UserConstants.ts'
import { ErrorMessages } from '../../constants/ErrorMessages.ts'
import { SuccessMessages } from '../../constants/SuccessMessages.ts'

class FireStoreRegister {
    static registerInitialUser(
        firestore: Firestore,
        user: User,
        onSuccess: (isSuccess: boolean) => void
    ) {
        //check if user is already registered
        Utils.checkCompleteRegistration(firestore, user, (isSuccess) => {
            if (isSuccess) {
                onSuccess(true)
                return
            }

            const data = new UserModel(
                user.uid,
                '',
                user.displayName!,
                user.photoURL!,
                '',
                UserStatus.Online,
                [],
                '',
                []
            ).toObject()

            const userDocRef = doc(firestore, FirestoreCollections.USERS_COLLECTION, user.uid)
            setDoc(userDocRef, data)
                .then(() => {
                    onSuccess(true)
                })
                .catch((error) => {
                    console.error('Error adding document:', error)
                    onSuccess(false)
                })
        })
    }

    static registerCompleteUser(
        firestore: Firestore,
        user: User | null,
        username: string,
        callback: (message: string) => void
    ) {
        Utils.checkAvailableUsername(firestore, username, (isAvailable) => {
            if (!isAvailable) {
                callback(ErrorMessages.USERNAME_ALREADY_EXISTS)
                return
            }

            //get data from uid document
            this.getDataFromUIDDocument(firestore, user!, (userMap) => {
                if (userMap === null) {
                    callback(ErrorMessages.ERROR_UPDATING_USERNAME)
                    return
                }
                userMap['username'] = username

                //create new document with username as document id
                this.createNewUsernameDocument(firestore, username, userMap, (isCreated) => {
                    if (!isCreated) {
                        callback(ErrorMessages.ERROR_UPDATING_USERNAME)
                        return
                    }
                    //delete user document with uid as document id
                    this.deleteUIDDocument(firestore, user!, (isDeleted) => {
                        if (!isDeleted) {
                            callback(ErrorMessages.ERROR_UPDATING_USERNAME)
                            return
                        }

                        //register user with username as document id
                        this.registerInUIDCollection(firestore, user!, username, (isRegistered) => {
                            if (isRegistered) {
                                callback(SuccessMessages.USERNAME_UPDATED_SUCCESSFULLY)
                            } else {
                                callback(ErrorMessages.ERROR_UPDATING_USERNAME)
                                return
                            }
                        })
                    })
                })
            })
        })
    }

    /**
     * PRIVATE FUNCTIONS POINTING TO FIRESTORE UTILS
     */
    private static getDataFromUIDDocument(
        firestore: Firestore,
        user: User,
        callback: (data: { [key: string]: any } | null) => void
    ) {
        CrudUtils.getFirestoreDocument(
            firestore,
            FirestoreCollections.USERS_COLLECTION,
            user.uid,
            callback
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
            callback
        )
    }

    private static deleteUIDDocument(
        firestore: Firestore,
        user: User,
        callback: (isSuccess: boolean) => void
    ) {
        CrudUtils.deleteFirestoreDocument(
            firestore,
            FirestoreCollections.USERS_COLLECTION,
            user.uid,
            callback
        )
    }

    private static registerInUIDCollection(
        firestore: Firestore,
        user: User,
        username: string,
        callback: (isSuccess: boolean) => void
    ) {
        const data = {
            [UserConstants.USERNAME]: username,
        }
        CrudUtils.updateFirestoreDocument(
            firestore,
            FirestoreCollections.REGISTERED_IDS_COLLECTION,
            user.uid,
            data,
            callback
        )
    }
}

export default FireStoreRegister
