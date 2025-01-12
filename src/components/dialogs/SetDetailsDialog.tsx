import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    TextField,
    Typography,
    Stack,
    Box,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { enqueueSnackbar } from 'notistack'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useUserDetailsStore from '../../store/user.details.store.ts'
import { SuccessMessages } from '../../constants/SuccessMessages.ts'
import { DialogState } from '../../fragments/profile/UserProfileFragment.tsx'
import Person2Icon from '@mui/icons-material/Person2'
import InfoIcon from '@mui/icons-material/Info'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Save } from '@mui/icons-material'

const configs = [
    {
        type: 'Username',
        title: 'Set Username',
        description:
            'You have to choose a username on Chit Chat in order to be found by the people. People will be able to find you by this username and contact you.\n\nYou can use a–z, 0–9, and underscores. Minimum length is 5 characters, and it has to be unique.\n\nRemember: Username can only be set once.',
        icon: <Person2Icon />,
        min: 5,
        max: 15,
        regex: /^[a-zA-Z0-9_]*$/,
        updateFunction: (inputValue: string, callback: (message: string) => void) => {
            useUserDetailsStore.getState().updateUsername(inputValue, callback)
        },
    },
    {
        type: 'Name',
        title: 'Set Name',
        description:
            'You have to choose a name on Chit Chat. It will appear on your profile.\n\nYou can use a–z, 0–9, and underscores. Minimum length is 5 characters.',
        icon: <InfoIcon />,
        min: 5,
        max: 25,
        regex: /^[a-zA-Z0-9_ ]*$/,
        updateFunction: (inputValue: string, callback: (message: string) => void) => {
            useUserDetailsStore.getState().updateName(inputValue, callback)
        },
    },
    {
        type: 'Bio',
        title: 'Set Bio',
        description:
            'You can add something about yourself. It will appear on your profile. Anyone who visits your profile will be able to see it.',
        icon: <MenuBookIcon />,
        min: 0,
        max: 100,
        regex: /.*/,
        updateFunction: (inputValue: string, callback: (message: string) => void) => {
            useUserDetailsStore.getState().updateBio(inputValue, callback)
        },
    },
]

interface SetDetailsDialogProps {
    dialogState: DialogState
    setDialogState: React.Dispatch<React.SetStateAction<DialogState>>
}

const SetDetailsDialog: React.FC<SetDetailsDialogProps> = ({ dialogState, setDialogState }) => {
    const { open, type, value } = dialogState
    const config = configs.find((c) => c.type === type)!
    const { title, description, icon, min, max, regex, updateFunction } = config

    const [loading, setLoading] = useState<boolean>(false)

    const schema = z.object({
        inputValue: z
            .string()
            .min(min, `${type} length should be greater than ${min}`)
            .max(max, `${type} length should be less than ${max}`)
            .regex(regex, `${type} can only contain letters, numbers, underscores`),
    })

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        watch,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            inputValue: value,
        },
    })

    //reset form when dialog opens
    useEffect(() => {
        reset({ inputValue: value })
    }, [reset, value])

    const handleSave = (data: { inputValue: string }) => {
        setLoading(true)
        updateFunction(data.inputValue, (message: string) => {
            if (
                message ===
                (
                    SuccessMessages as {
                        [key: string]: string
                    }
                )[`${type.toUpperCase()}_UPDATED_SUCCESSFULLY`]
            ) {
                enqueueSnackbar(message, { variant: 'success', autoHideDuration: 3000 })
                setDialogState({ ...dialogState, open: false })
                reset()
            } else {
                enqueueSnackbar(message, { variant: 'error', autoHideDuration: 3000 })
            }
            setLoading(false)
        })
    }

    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={open}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 4,
                    overflow: 'hidden',
                },
            }}>
            {/* Accent Bar */}
            <Box height={6} bgcolor='primary.main' />

            <DialogTitle>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>{icon}</Avatar>
                    <Typography variant='h5' fontWeight='bold'>
                        {title}
                    </Typography>
                </Stack>
            </DialogTitle>

            <Divider />

            <DialogContent>
                <Box my={2} display='flex' flexDirection='column' gap={3}>
                    {/* Input Section */}
                    <Stack spacing={1}>
                        <form onSubmit={handleSubmit(handleSave)}>
                            <TextField
                                fullWidth
                                label={type}
                                {...register('inputValue')}
                                variant='outlined'
                                helperText={errors.inputValue?.message || ''}
                                error={!!errors.inputValue}
                            />
                        </form>
                        <Typography variant='body2' color='text.secondary' textAlign='right'>
                            {`${watch('inputValue').length}/${max} characters`}
                        </Typography>
                    </Stack>

                    {/* Description Section */}
                    <DialogContentText
                        sx={{
                            textAlign: 'justify',
                            fontSize: 14,
                            lineHeight: 1.6,
                            whiteSpace: 'pre-line',
                        }}>
                        {description}
                    </DialogContentText>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                    onClick={() => {
                        setDialogState({ ...dialogState, open: false })
                        //reset form on cancel
                        reset()
                    }}
                    variant='outlined'
                    color='error'>
                    Cancel
                </Button>
                <LoadingButton
                    onClick={handleSubmit(handleSave)}
                    loading={loading}
                    disabled={errors.inputValue !== undefined}
                    loadingPosition='start'
                    startIcon={<Save />}
                    variant='contained'
                    color='primary'>
                    Save
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default SetDetailsDialog
