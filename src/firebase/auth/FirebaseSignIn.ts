import {
    Auth,
    fetchSignInMethodsForEmail,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    linkWithCredential,
    OAuthCredential,
    signInWithPopup,
    signOut,
    AuthError,
} from 'firebase/auth'

type FirebaseSignInError = AuthError & {
    customData?: {
        email: string
    }
}

class FirebaseSignIn {
    static async firebaseSignInWithGoogle() {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential?.accessToken
            console.log(token)
            return result.user
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async firebaseSignInWithGithub() {
        const auth = getAuth()
        const provider = new GithubAuthProvider()

        try {
            const result = await signInWithPopup(auth, provider)
            const credential = GithubAuthProvider.credentialFromResult(result)
            const token = credential?.accessToken
            console.log(token)
            return result.user
        } catch (error) {
            const errorCode = (error as FirebaseSignInError).code
            const credential = GithubAuthProvider.credentialFromError(error as FirebaseSignInError)!
            if (errorCode === 'auth/account-exists-with-different-credential') {
                const email = (error as FirebaseSignInError).customData?.email
                return await this.linkGithubToGoogle(email, auth, credential)
            } else {
                console.log(error)
                return null
            }
        }
    }

    static async linkGithubToGoogle(email: string, auth: Auth, credential: OAuthCredential) {
        try {
            const methods = await fetchSignInMethodsForEmail(auth, email)
            if (methods[0] === 'google.com') {
                const user = await this.firebaseSignInWithGoogle()
                if (user) {
                    const userCred = await linkWithCredential(user, credential)
                    return userCred.user
                }
                return null
            }
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async firebaseSignOut() {
        const auth = getAuth()
        try {
            await signOut(auth)
            console.log('Logout success')
        } catch (error) {
            console.log('Sign-out error', error)
        }
    }
}

export default FirebaseSignIn
