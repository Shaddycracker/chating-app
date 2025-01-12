import { Badge, IconButton, Typography } from '@mui/material'
import { GlobalConstants } from '../../constants/GlobalConstants.ts'
import LogoutIcon from '@mui/icons-material/Logout'
import React, { SetStateAction } from 'react'
import ItemChat from '../../components/listItems/ItemChat.tsx'
import ItemFavChat from '../../components/listItems/ItemFavChat.tsx'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Avatar from '@mui/material/Avatar'
import useAuthStore from '../../store/auth.store.ts'
import useHomeStore from '../../store/home.store.ts'
import useLocalStore from '../../store/local.store.ts'

const ChatsFragment: React.FC<{ openProfile: React.Dispatch<SetStateAction<boolean>> }> = ({
    openProfile,
}) => {
    const { logout } = useAuthStore()
    const { user } = useHomeStore()
    const setUsername = useLocalStore((state) => state.setUsername)

    const logoutUser = async () => {
        await logout()
        setUsername(null)
    }

    const chats: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const favChats: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] // this Will Changed Soon based on User Data current
    return (
        <div className={'h-screen flex flex-col'}>
            <div className={'h-14 m-4 flex flex-row'}>
                <div className={'flex flex-col justify-center'}>
                    <Typography className={'select-none'} color={'white'} variant={'h4'}>
                        {GlobalConstants.APP_NAME}
                    </Typography>
                </div>
                <div className={'flex-1'} />
                <div className={'flex flex-col justify-center rounded-full'}>
                    <IconButton
                        onClick={() => {
                            openProfile(true)
                        }}>
                        <Badge
                            overlap='circular'
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={<div className={'w-3 h-3 bg-green-500 rounded-full'} />}>
                            <Avatar
                                src={user?.profileImage}
                                sx={{ width: 48, height: 48, fontSize: 28 }}
                                alt={user?.name}
                            />
                        </Badge>
                    </IconButton>
                </div>
                <div className={'flex flex-col justify-center'}>
                    <IconButton onClick={logoutUser}>
                        <LogoutIcon className={'text-white'} />
                    </IconButton>
                </div>
            </div>
            {/*search field*/}
            <div>
                <div className={'mx-4 flex'}>
                    <input
                        className={'flex-1 bg-slate-600 rounded-md h-10 px-4 py-2'}
                        style={{
                            backgroundColor: '#1e2a31',
                            border: 'none',
                            color: 'white',
                        }}
                        type='text'
                        placeholder='Search'
                    />
                </div>
            </div>

            <div
                className={
                    'overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-800/10 scrollbar-thumb-rounded-full'
                }>
                {/*Fav chats list*/}
                {favChats.length > 0 && (
                    <div>
                        <div className={'flex flex-col'}>
                            <div className={'flex flex-row m-4'}>
                                <Typography
                                    className={'select-none'}
                                    color={'white'}
                                    variant={'h6'}>
                                    Favourites
                                </Typography>
                            </div>
                            <div className='flex overflow-hidden'>
                                <div className={'flex flex-row gap-4'}>
                                    {favChats.map((item) => (
                                        <ItemFavChat
                                            key={item}
                                            image={'https://i.pravatar.cc/300'}
                                            name={`Item ${item}`}
                                        />
                                    ))}
                                </div>
                                <div className={'flex-auto flex justify-center'}>
                                    <IconButton>
                                        <ArrowForwardIosIcon className={'text-white/50'} />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/*Chats list*/}
                {chats.length > 0 ? (
                    <div>
                        <div className={'flex flex-col m-4'}>
                            <Typography className={'select-none'} color={'white'} variant={'h6'}>
                                Chats
                            </Typography>
                        </div>
                        <div className={'flex flex-col'}>
                            {chats.map((item) => (
                                <ItemChat
                                    key={item}
                                    image={'https://i.pravatar.cc/300'}
                                    primaryText={`Item ${item}`}
                                    secondaryText={`Item ${item}`}
                                    time={'10:00'}
                                    notification={1}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={'flex flex-col m-4'}>
                        <Typography className={'select-none'} color={'white'} variant={'h6'}>
                            No chats
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatsFragment
