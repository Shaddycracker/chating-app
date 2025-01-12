import FirebaseSignIn from '../firebase/auth/FirebaseSignIn.ts'
import FireStoreRegister from '../firebase/auth/FireStoreRegister.ts'
import { User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

class AuthRepository {
    static googleLogin = async () => {
        try {
            await FirebaseSignIn.firebaseSignInWithGoogle()
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    static githubLogin = async () => {
        try {
            await FirebaseSignIn.firebaseSignInWithGithub()
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    static logout = async () => {
        try {
            await FirebaseSignIn.firebaseSignOut()
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    static onSignInResult = async (user: User) => {
        const fireStore = getFirestore()
        try {
            //convert to promise for error handling and distinction between android and web code
            return await new Promise<boolean>((resolve, reject) => {
                FireStoreRegister.registerInitialUser(fireStore, user, (isSuccess) => {
                    if (isSuccess) {
                        resolve(true)
                    } else {
                        reject(false)
                    }
                })
            })
        } catch (error) {
            console.error('Error registering user:', error)
            return false
        }
    }
}

export default AuthRepository
