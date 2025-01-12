import React, { useEffect, useRef } from 'react'
import LeftChatMessage from '../chatMessages/LeftChatMessage.tsx'
import { ChatMessageType } from '../../enums/ChatMessageType.ts'
import stickerData from '../../assets/stickers/sticker_ghost_1.json'
import RightChatMessage from '../chatMessages/RightChatMessage.tsx'

const ChatBox: React.FC = () => {
    // for scrolling to bottom
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])
    return (
        <div
            className={
                'z-0 flex-1 bg-white overflow-y-scroll ' +
                'scrollbar-thin scrollbar-thumb-slate-500/50 scrollbar-track-white scrollbar-thumb-rounded-full'
            }>
            {/*Chatting list*/}
            <div className={'flex flex-col gap-2'}>
                <LeftChatMessage
                    type={ChatMessageType.TEXT}
                    profileImage={'https://i.pravatar.cc/300'}
                    message={'Hello world'}
                    time={'10:00'}
                />

                <LeftChatMessage
                    type={ChatMessageType.IMAGE}
                    profileImage={'https://i.pravatar.cc/300'}
                    image={
                        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
                    }
                    time={'10:00'}
                />

                <LeftChatMessage
                    type={ChatMessageType.STICKER}
                    profileImage={'https://i.pravatar.cc/300'}
                    sticker={stickerData}
                    time={'10:00'}
                />

                <RightChatMessage
                    type={ChatMessageType.TEXT}
                    seen={['https://i.pravatar.cc/300']}
                    message={'Hello world'}
                    time={'10:00'}
                />

                <RightChatMessage
                    type={ChatMessageType.IMAGE}
                    seen={['https://i.pravatar.cc/300']}
                    image={
                        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
                    }
                    time={'10:00'}
                />

                <RightChatMessage
                    type={ChatMessageType.STICKER}
                    seen={['https://i.pravatar.cc/300']}
                    sticker={stickerData}
                    time={'10:00'}
                />

                <div ref={bottomRef} />
            </div>
        </div>
    )
}

export default ChatBox
