import React from 'react'
import androidImage from '../../assets/chit_chat_android.png'
import icon from '../../assets/logo.png'
import { NoEncryption } from '@mui/icons-material'

const EmptyChatFragment: React.FC = () => {
    const handleDownload = () => {
        const url = 'https://github.com/Thre4dripper/Chit-Chat-AndroidApp/releases/tag/publish'

        window.alert(
            "When installing, it may give a warning, but don't worry, it's safe. " +
                "As it's not from the Play Store, it's not recognized by Google. So your phone might give a warning."
        )
        window.open(url, '_blank')
    }

    return (
        <div
            className={
                'w-full h-full bg-slate-700 flex flex-col items-center justify-center py-10'
            }>
            <div className={'flex flex-col items-center justify-center'}>
                <div className={'relative flex flex-col h-fit w-fit items-center justify-center'}>
                    <img className={'w-52'} src={androidImage} alt={'empty chat'} />
                    <img className={'absolute bottom-10 -right-8 w-20'} src={icon} alt={'icon'} />
                </div>
            </div>
            <div className={'flex flex-col gap-4 items-center justify-center'}>
                <span className={'text-white text-3xl font-thin'}>
                    Download ChitChat on your Android device
                </span>
                <span className={'text-slate-400 text-lg '}>
                    Make your conversations more fun and interactive with ChitChat on your Android
                </span>
                <div
                    className={
                        'px-10 py-3 bg-slate-900 rounded-full flex items-center justify-center ' +
                        'cursor-pointer hover:bg-slate-800 transition-all duration-300'
                    }
                    onClick={handleDownload}>
                    <span className={'text-white text-lg select-none'}>Download</span>
                </div>
            </div>
            <div className={'flex-1'} />
            <div className={'flex flex-row gap-1 items-center justify-center'}>
                <NoEncryption
                    className={'text-slate-400'}
                    style={{
                        transform: 'scale(0.7)',
                    }}
                />
                <span className={'text-slate-400 text-sm h-full'}>
                    Your personal messages are not end-to-end encrypted and are totally visible to
                    the server
                </span>
            </div>
        </div>
    )
}

export default EmptyChatFragment
