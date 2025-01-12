import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import logo from '../../assets/logo.png'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { ButtonBase } from '@mui/material'
import google_logo from '../../assets/auth/google_logo.webp'
import github_logo from '../../assets/auth/github_logo.png'
import { GlobalConstants } from '../../constants/GlobalConstants.ts'
import image from '../../assets/auth/signin_image.png'

interface ButtonsFragmentProps {
    signInWithGoogle: () => void
    signInWithGithub: () => void
}

const ButtonsFragment: React.FC<ButtonsFragmentProps> = ({
    signInWithGoogle,
    signInWithGithub,
}) => {
    return (
        <Box
            sx={{
                py: 8,
                px: 8,
                height: '100%',
            }}>
            <div className={'w-fit h-full flex flex-col gap-4 items-center'}>
                <div
                    className={'px-4 py-2 rounded-full shadow-md shadow-black/50 text-center'}
                    style={{
                        backgroundColor: '#615e93',
                    }}>
                    <Typography component='h1' variant='h5' color={'white'}>
                        {GlobalConstants.APP_NAME}
                    </Typography>
                </div>
                <div className={'hidden lg:flex'}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        }}>
                        <Avatar sx={{ bgcolor: 'secondary.main' }} className={'hidden'}>
                            <img src={logo} alt='logo' className={'w-10'} />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Sign in
                        </Typography>
                    </Box>
                </div>
                <div className={'flex lg:hidden'}>
                    <img src={image} alt='auth_ui_logo' className={'w-60 h-60'} />
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                    <Paper
                        elevation={3}
                        sx={{
                            overflow: 'hidden',
                        }}
                        onClick={signInWithGoogle}>
                        <ButtonBase>
                            <div
                                className={'ml-4 mr-8 my-2 flex justify-center items-center gap-4'}>
                                <img src={google_logo} alt='github_logo' className={'w-8'} />
                                <span className={'text-md'}>Sign in with Google</span>
                            </div>
                        </ButtonBase>
                    </Paper>
                    <Paper
                        elevation={3}
                        sx={{
                            overflow: 'hidden',
                            backgroundColor: '#24292e',
                        }}
                        onClick={signInWithGithub}>
                        <ButtonBase>
                            <div
                                className={'ml-4 mr-8 my-2 flex justify-center items-center gap-4'}>
                                <img src={github_logo} alt='github_logo' className={'w-8'} />
                                <span className={'text-md text-white'}>Sign in with Github</span>
                            </div>
                        </ButtonBase>
                    </Paper>
                </Box>
            </div>
        </Box>
    )
}

export default ButtonsFragment
