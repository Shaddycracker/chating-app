import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import ButtonsFragment from '../fragments/auth/ButtonsFragment.tsx'
import Canvas from '../fragments/auth/Canvas.tsx'
import useAuthStore from '../store/auth.store.ts'
import { useNavigate } from 'react-router-dom'
import useLocalStore from '../store/local.store.ts'
import { enqueueSnackbar } from 'notistack'

const AuthScreen: React.FC = () => {
    const navigate = useNavigate()
    const { googleLogin, githubLogin } = useAuthStore()
    const username = useLocalStore((state) => state.username)

    useEffect(() => {
        if (username) {
            navigate('/')
        }
    }, [navigate, username])

    const handleGoogleLogin = async () => {
        const isSuccess = await googleLogin()

        if (isSuccess) {
            navigate('/')
            enqueueSnackbar('Successfully logged in with Google', {
                variant: 'success',
                anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
            })
        } else {
            enqueueSnackbar('Failed to login with Google', {
                variant: 'error',
                anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
            })
        }
    }

    const handleGithubLogin = async () => {
        const isSuccess = await githubLogin()

        if (isSuccess) {
            navigate('/')
            enqueueSnackbar('Successfully logged in with Github', {
                variant: 'success',
                anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
            })
        } else {
            enqueueSnackbar('Failed to login with Github', {
                variant: 'error',
                anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
            })
        }
    }

    return (
        <Grid container sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <Grid sx={{ width: '100%', height: '100%' }} className={'hidden lg:flex'}>
                <Canvas />
            </Grid>
            <Grid className={'absolute h-full right-0'}>
                <ButtonsFragment
                    signInWithGoogle={handleGoogleLogin}
                    signInWithGithub={handleGithubLogin}
                />
            </Grid>
        </Grid>
    )
}

export default AuthScreen
