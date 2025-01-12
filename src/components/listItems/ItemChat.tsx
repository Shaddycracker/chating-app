import { Divider, Typography } from '@mui/material'
import React from 'react'
import CircularImage from '../CircularImage.tsx'

interface ItemChatProps {
    image: string
    primaryText: string
    secondaryText: string
    time: string
    notification: number
}

const ItemChat: React.FC<ItemChatProps> = ({
    image,
    primaryText,
    secondaryText,
    time,
    notification,
}) => {
    if (primaryText.length > 20) {
        primaryText = primaryText.substring(0, 24) + '...'
    }

    return (
        <div>
            <div
                className={
                    'flex flex-row gap-4 px-4 py-2 select-none cursor-pointer hover:bg-slate-900 active:bg-slate-800'
                }>
                <CircularImage image={image} size={48} />
                <div className={'flex flex-col flex-auto justify-center'}>
                    {/*create a primary text container with ellipses effect on longer text and time container at the end*/}
                    <div className={'flex flex-row justify-between'}>
                        <div style={{ textOverflow: 'ellipsis' }} className={'text-white text-lg'}>
                            {primaryText}
                        </div>
                        <Typography variant={'subtitle2'} color={'gray'}>
                            {time}
                        </Typography>
                    </div>
                    <div className={'flex flex-row justify-between'}>
                        <Typography variant={'subtitle2'} color={'gray'}>
                            {secondaryText}
                        </Typography>
                        <div className={'flex flex-row justify-center items-center'}>
                            <div
                                className={
                                    'w-auto min-w-[1.2rem] px-1 h-5 bg-blue-300/50 rounded-full text-white text-xs flex justify-center items-center'
                                }>
                                {notification}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Separator*/}
            <div className={'flex justify-end'}>
                <Divider className={'bg-white/20 w-4/5'} />
            </div>
        </div>
    )
}

export default ItemChat
