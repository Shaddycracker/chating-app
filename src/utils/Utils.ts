import { User } from 'firebase/auth'
import { FirestoreCollections } from '../constants/FireStoreCollections.ts'
import { doc, getDoc, Firestore } from 'firebase/firestore'

class Utils {
    /**
     * Function to Check if the user is already initially registered as an uid document in firestore
     */
    static checkInitialRegistration(
        firestore: Firestore,
        user: User | null,
        isInitial: (isSuccess: boolean) => void
    ) {
        if (!user) {
            isInitial(false)
            return
        }

        const docRef = doc(firestore, FirestoreCollections.USERS_COLLECTION, user.uid)
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    isInitial(true)
                } else {
                    isInitial(false)
                }
            })
            .catch((error) => {
                console.error('Error getting document:', error)
                isInitial(false)
            })
    }

    /**
     * Function to Check if the user is already completely registered as a username document in firestore
     */
    static checkCompleteRegistration(
        firestore: Firestore,
        user: User | null,
        isComplete: (isSuccess: boolean) => void
    ) {
        if (!user) {
            isComplete(false)
            return
        }

        const docRef = doc(firestore, FirestoreCollections.REGISTERED_IDS_COLLECTION, user.uid!)
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    isComplete(true)
                } else {
                    isComplete(false)
                }
            })
            .catch((error) => {
                console.error('Error getting document:', error)
                isComplete(false)
            })
    }

    /**
     * Function to Check if the username is available in firestore
     */
    static checkAvailableUsername(
        firestore: Firestore,
        username: string,
        available: (isSuccess: boolean) => void
    ) {
        const docRef = doc(firestore, FirestoreCollections.USERS_COLLECTION, username)
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    available(false)
                } else {
                    available(true)
                }
            })
            .catch((error) => {
                console.error('Error getting document:', error)
                available(false)
            })
    }
}

export default Utils
