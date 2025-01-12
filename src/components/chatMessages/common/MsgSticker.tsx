import React from 'react'
import { ButtonBase } from '@mui/material'
import Lottie, { LottieOptions } from 'lottie-react'

interface LeftStickerProps {
    stickerData: LottieOptions['animationData']
}

const MsgSticker: React.FC<LeftStickerProps> = ({ stickerData }) => {
    return (
        <div className={'rounded-2xl w-fit overflow-hidden'}>
            <ButtonBase>
                <Lottie
                    className={'max-h-[200px] max-w-[200px]'}
                    animationData={stickerData}
                    loop={true}
                    autoPlay={true}
                />
            </ButtonBase>
        </div>
    )
}

export default MsgSticker
