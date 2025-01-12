import { Avatar, IconButton } from '@mui/material'
import React from 'react'

interface CircularImageProps {
    image: string
    size?: number
    alt?: string
}

const CircularImage: React.FC<CircularImageProps> = ({ image, size, alt }) => {
    return (
        <div className={'flex flex-col justify-center'}>
            <IconButton>
                <div className={'rounded-full p-0.5 bg-white'}>
                    <Avatar src={image} sx={{ width: size, height: size }} alt={alt} />
                </div>
            </IconButton>
        </div>
    )
}

export default CircularImage
