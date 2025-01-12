import { doc, Firestore, getDoc } from 'firebase/firestore'
import { User } from 'firebase/auth'
import UserModel from '../../models/user.model.ts'
import { FirestoreCollections } from '../../constants/FireStoreCollections.ts'

class GetProfile {
    static getProfile(
        firestore: Firestore,
        user: User | null,
        username: string | null,
        profile: (userModel: UserModel | null) => void
    ) {
        this.getProfileFromUsernameDoc(firestore, username, (userModel) => {
            if (userModel === null) {
                this.getProfileFromUidDoc(firestore, user!.uid, (uidDocProfile) => {
                    profile(uidDocProfile)
                })
            } else {
                profile(userModel)
            }
        })
    }

    private static getProfileFromUidDoc(
        firestore: Firestore,
        uid: string | null,
        profile: (userModel: UserModel | null) => void
    ) {
        const docRef = doc(firestore, FirestoreCollections.USERS_COLLECTION, uid!)
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    profile(doc.data() as UserModel)
                } else {
                    profile(null)
                }
            })
            .catch((error) => {
                console.error('Error getting document:', error)
                profile(null)
            })
    }

    private static getProfileFromUsernameDoc(
        firestore: Firestore,
        username: string | null,
        profile: (userModel: UserModel | null) => void
    ) {
        if (username === null) {
            profile(null)
            return
        }
        const docRef = doc(firestore, FirestoreCollections.USERS_COLLECTION, username)
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    profile(doc.data() as UserModel)
                } else {
                    profile(null)
                }
            })
            .catch((error) => {
                console.error('Error getting document:', error)
                profile(null)
            })
    }
}

export default GetProfile
