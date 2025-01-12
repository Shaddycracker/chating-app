import CircularImage from '../CircularImage.tsx'
import React from 'react'
import MsgText from './common/MsgText.tsx'
import { ChatMessageType } from '../../enums/ChatMessageType.ts'
import MsgImage from './common/MsgImage.tsx'
import MsgSticker from './common/MsgSticker.tsx'
import { LottieOptions } from 'lottie-react'

interface ItemChatLeftMsgProps {
    type: ChatMessageType
    profileImage: string
    message?: string
    image?: string
    sticker?: LottieOptions['animationData']
    time: string
}

const LeftChatMessage: React.FC<ItemChatLeftMsgProps> = ({
    type,
    profileImage,
    message,
    image,
    sticker,
    time,
}) => {
    const leftMessageColor = '#DAE2FF'
    return (
        <div className={'w-full flex flex-row px-4 py-2 justify-start'}>
            <div>
                <CircularImage image={profileImage} size={28} alt={'Profile image'} />
            </div>
            <div>
                {type === ChatMessageType.TEXT && (
                    <div
                        style={{ backgroundColor: leftMessageColor }}
                        className={
                            'shadow-slate-950/20 shadow-md ' +
                            'max-w-[36rem] w-full ' +
                            'rounded-tl-3xl rounded-bl-lg rounded-br-3xl rounded-tr-3xl'
                        }>
                        <MsgText message={message ?? ''} className={'text-black/80'} />
                    </div>
                )}
                {type === ChatMessageType.IMAGE && (
                    <div
                        style={{ backgroundColor: leftMessageColor }}
                        className={
                            'shadow-slate-950/20 shadow-md ' +
                            'min-w-[16rem] max-w-[36rem] w-full ' +
                            'rounded-tl-3xl rounded-bl-lg rounded-br-3xl rounded-tr-3xl overflow-hidden'
                        }>
                        <MsgImage image={image ?? ''} />
                    </div>
                )}
                {type === ChatMessageType.STICKER && (
                    <div
                        className={
                            'max-w-[36rem] w-full ' +
                            'rounded-tl-3xl rounded-bl-lg rounded-br-3xl rounded-tr-3xl'
                        }>
                        <MsgSticker stickerData={sticker ?? ''} />
                    </div>
                )}
                <div className={'flex justify-start my-2'}>
                    <span className={'text-slate-400 font-bold text-xs'}>{time}</span>
                </div>
            </div>
        </div>
    )
}

export default LeftChatMessage
