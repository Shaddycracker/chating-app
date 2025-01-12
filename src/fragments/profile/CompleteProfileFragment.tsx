import React from 'react'
import completeProfile from '../../assets/lottie/complete_profile.json'
import Lottie from 'lottie-react'
import { Alert } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const CompleteProfileFragment: React.FC = () => {
    return (
        <div
            className={
                'bg-blue-50 h-screen rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl rounded-br-3xl flex justify-center items-center'
            }>
            <div className={'flex flex-col'}>
                <Lottie
                    className={'max-h-[300px] max-w-[300px]'}
                    animationData={completeProfile}
                    loop={true}
                    autoPlay={true}
                />
                <Alert icon={<InfoIcon fontSize='inherit' />} severity='info'>
                    Complete your profile to start chatting
                </Alert>
            </div>
        </div>
    )
}

export default CompleteProfileFragment
