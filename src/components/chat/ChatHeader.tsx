import CircularImage from '../CircularImage.tsx'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import React from 'react'

const ChatHeader: React.FC = () => {
    return (
        <div
            className={
                'z-10 bg-slate-300 rounded-3xl shadow-slate-950/20 shadow-md flex flex-row px-4 pt-4 pb-2'
            }>
            <CircularImage image={'https://i.pravatar.cc/300'} size={48} />
            <div className={'mx-4 flex flex-col flex-auto justify-center'}>
                <div className={'flex flex-row justify-between'}>
                    <span className={'text-black text-lg font-bold'}>{'Chat Name'}</span>
                </div>
                <div className={'flex flex-row justify-between'}>
                    <span className={'text-green-600 font-medium text-sm'}>{'Online'}</span>
                </div>
            </div>
            <div>
                <div className={'mt-2'}>
                    <IconButton>
                        <MoreVertIcon className={'text-gray-500'} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
