import { ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage'

class StorageUtils {
    static getUrlFromStorage(
        storage: FirebaseStorage,
        path: string,
        image: File,
        callback: (url: string | null) => void
    ) {
        const storageRef = ref(storage, path)
        uploadBytes(storageRef, image)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            })
            .then((url) => {
                callback(url)
            })
            .catch((error) => {
                console.error('Error uploading file:', error)
                callback(null)
            })
    }

    static fileToBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error)
        })
    }

    static base64ToFile = (base64: string, filename: string): File => {
        const arr = base64.split(',')
        const mime = arr[0].match(/:(.*?);/)![1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) u8arr[n] = bstr.charCodeAt(n)
        return new File([u8arr], filename, { type: mime })
    }
}

export default StorageUtils
