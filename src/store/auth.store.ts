import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { immer } from 'zustand/middleware/immer'
import AuthRepository from '../repositories/auth.repository.ts'

type AuthState = {
    isLoading: boolean | null
    isAuthSuccess: boolean | null
}

type AuthActions = {
    googleLogin: () => Promise<boolean>
    githubLogin: () => Promise<boolean>
    onSignInResult: (callback: (isSuccess: boolean) => void) => void
    logout: () => Promise<boolean>
}

const useAuthStore = create<AuthState & AuthActions>()(
    devtools(
        immer((set) => ({
            isLoading: null,
            isAuthSuccess: null,
            googleLogin: async () => {
                set({ isLoading: true })
                try {
                    await AuthRepository.googleLogin()
                } catch (error) {
                    console.error(error)
                    return false
                }
                set({ isLoading: false })
                return true
            },
            githubLogin: async () => {
                set({ isLoading: true })
                try {
                    await AuthRepository.githubLogin()
                } catch (error) {
                    console.error(error)
                    return false
                }
                set({ isLoading: false })
                return true
            },
            onSignInResult: (callback) => {
                const auth = getAuth()
                set({ isLoading: true })
                set({ isAuthSuccess: null })
                onAuthStateChanged(auth, async (user) => {
                    if (!user) {
                        set({ isLoading: false })
                        set({ isAuthSuccess: false })
                        callback(false)
                        return
                    }

                    const isRegistered = await AuthRepository.onSignInResult(user)
                    if (!isRegistered) {
                        set({ isLoading: false })
                        set({ isAuthSuccess: false })
                        console.log('Error registering user')
                        callback(false)
                        return
                    }

                    set({ isLoading: false })
                    set({ isAuthSuccess: true })
                    callback(true)
                })
            },
            logout: async () => {
                set({ isLoading: true })
                try {
                    await AuthRepository.logout()
                    set({ isLoading: false })
                } catch (error) {
                    console.error(error)
                    return false
                }
                return true
            },
        }))
    )
)

export default useAuthStore
