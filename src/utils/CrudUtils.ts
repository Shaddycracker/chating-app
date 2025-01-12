import { doc, Firestore, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

class CrudUtils {
    static getFirestoreDocument(
        firestore: Firestore,
        collectionName: string,
        documentId: string,
        onSuccess: (data: { [key: string]: any } | null) => void
    ) {
        const docRef = doc(firestore, collectionName, documentId)
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    onSuccess(doc.data())
                } else {
                    onSuccess(null)
                }
            })
            .catch((error) => {
                console.error('Error getting document:', error)
                onSuccess(null)
            })
    }

    static createFirestoreDocument(
        firestore: Firestore,
        collection: string,
        document: string,
        data: { [key: string]: any },
        success: (isSuccess: boolean) => void
    ) {
        const docRef = doc(firestore, collection, document)
        setDoc(docRef, data)
            .then(() => {
                success(true)
            })
            .catch(() => {
                success(false)
            })
    }

    static updateFirestoreDocument(
        firestore: Firestore,
        collection: string,
        document: string,
        data: { [key: string]: any },
        success: (isSuccess: boolean) => void
    ) {
        const docRef = doc(firestore, collection, document)
        setDoc(docRef, data, { merge: true })
            .then(() => {
                success(true)
            })
            .catch(() => {
                success(false)
            })
    }

    static deleteFirestoreDocument(
        firestore: Firestore,
        collection: string,
        document: string,
        success: (isSuccess: boolean) => void
    ) {
        const docRef = doc(firestore, collection, document)
        deleteDoc(docRef)
            .then(() => {
                success(true)
            })
            .catch(() => {
                success(false)
            })
    }
}

export default CrudUtils
