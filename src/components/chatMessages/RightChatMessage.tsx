import React from 'react'
import { ChatMessageType } from '../../enums/ChatMessageType.ts'
import MsgText from './common/MsgText.tsx'
import MsgImage from './common/MsgImage.tsx'
import MsgSticker from './common/MsgSticker.tsx'
import { LottieOptions } from 'lottie-react'
import CircularImage from '../CircularImage.tsx'

interface ItemChatRightMsgProps {
    type: ChatMessageType
    seen: string[]
    message?: string
    image?: string
    sticker?: LottieOptions['animationData']
    time: string
}

const RightChatMessage: React.FC<ItemChatRightMsgProps> = ({
    type,
    seen,
    message,
    image,
    sticker,
    time,
}) => {
    const rightMessageColor = '#FF8181'
    return (
        <div className={'w-full flex flex-row px-4 py-2 justify-end'}>
            <div>
                {type === ChatMessageType.TEXT && (
                    <div
                        style={{ backgroundColor: rightMessageColor }}
                        className={
                            'shadow-slate-950/20 shadow-md ' +
                            'max-w-[36rem] w-full ' +
                            'rounded-tl-3xl rounded-bl-3xl rounded-br-lg rounded-tr-3xl'
                        }>
                        <MsgText message={message ?? ''} className={'text-white/80'} />
                    </div>
                )}
                {type === ChatMessageType.IMAGE && (
                    <div
                        style={{ backgroundColor: rightMessageColor }}
                        className={
                            'shadow-slate-950/20 shadow-md ' +
                            'min-w-[16rem] max-w-[36rem] w-full ' +
                            'rounded-tl-3xl rounded-bl-3xl rounded-br-lg rounded-tr-3xl overflow-hidden'
                        }>
                        <MsgImage image={image ?? ''} />
                    </div>
                )}
                {type === ChatMessageType.STICKER && (
                    <div
                        className={
                            'max-w-[36rem] w-full ' +
                            'rounded-tl-3xl rounded-bl-3xl rounded-br-lg rounded-tr-3xl flex justify-end'
                        }>
                        <MsgSticker stickerData={sticker ?? ''} />
                    </div>
                )}
                <div className={'flex justify-end'}>
                    <div className={'flex flex-row-reverse'}>
                        {seen.map((item) => {
                            return (
                                <div key={item} className={'-ml-6'}>
                                    <CircularImage image={item} size={20} alt={'Sender Image'} />
                                </div>
                            )
                        })}
                    </div>
                    <div className={'flex flex-col justify-center'}>
                        <span className={'text-slate-400 font-bold text-xs'}>{time}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightChatMessage
