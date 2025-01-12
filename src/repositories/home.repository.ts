import Utils from '../utils/Utils.ts'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import CrudUtils from '../utils/CrudUtils.ts'
import { FirestoreCollections } from '../constants/FireStoreCollections.ts'
import { UserConstants } from '../constants/UserConstants.ts'

class HomeRepository {
    static getUsername(onSuccess: (username: string | null) => void) {
        const firestore = getFirestore()
        const auth = getAuth()
        const user = auth.currentUser

        CrudUtils.getFirestoreDocument(
            firestore,
            FirestoreCollections.REGISTERED_IDS_COLLECTION,
            user!.uid,
            (data) => {
                if (data) {
                    onSuccess(data[UserConstants.USERNAME] as string)
                } else {
                    onSuccess(null)
                }
            }
        )
    }

    static checkInitialRegistration(onSuccess: (isInitial: boolean) => void) {
        const firestore = getFirestore()
        const auth = getAuth()
        const user = auth.currentUser

        Utils.checkInitialRegistration(firestore, user, onSuccess)
    }

    static checkCompleteRegistration(onSuccess: (isCompleted: boolean) => void) {
        const firestore = getFirestore()
        const auth = getAuth()
        const user = auth.currentUser

        Utils.checkCompleteRegistration(firestore, user, onSuccess)
    }
}

export default HomeRepository
