import { Typography } from '@mui/material'
import CircularImage from '../CircularImage.tsx'
import React from 'react'

interface FavChatProps {
    image: string
    name: string
}

const ItemFavChat: React.FC<FavChatProps> = ({ image, name }) => {
    return (
        <div className={'flex flex-col items-center'}>
            <CircularImage image={image} size={80} />
            <Typography variant='subtitle1' color='white' align='center'>
                {name}
            </Typography>
        </div>
    )
}

export default ItemFavChat
