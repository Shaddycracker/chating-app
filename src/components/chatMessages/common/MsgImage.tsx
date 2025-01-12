import React from 'react'
import { ButtonBase } from '@mui/material'

interface LeftImageProps {
    image: string
}

const MsgImage: React.FC<LeftImageProps> = ({ image }) => {
    return (
        <ButtonBase>
            <img
                src={image}
                alt={'Chat image'}
                className={'m-1.5 max-h-[250px] max-w-[250px] object-cover w-full rounded-3xl'}
            />
        </ButtonBase>
    )
}

export default MsgImage
