import React, { useRef, useState } from 'react'
import { Paper } from '@mui/material'
import Button from '@mui/material/Button'
import { centerCrop, convertToPixelCrop, Crop, makeAspectCrop, ReactCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Typography from '@mui/material/Typography'
import { CropRotate, Save } from '@mui/icons-material'
import CustomSmoothSlider from '../../components/CustomSmoothSlider.tsx'
import StorageUtils from '../../utils/StorageUtils.ts'
import { LoadingButton } from '@mui/lab'
import useUserDetailsStore from '../../store/user.details.store.ts'
import { enqueueSnackbar } from 'notistack'
import { SuccessMessages } from '../../constants/SuccessMessages.ts'

interface OutputSize {
    width: number
    height: number
}

interface ImageCropFragmentProps {
    cropShape: 'rect' | 'round'
    aspect: number
    outputSize: OutputSize
    image: string | null
    onCancel: () => void
    onConfirmed: (image: File) => void
}

const ImageCropFragment: React.FC<ImageCropFragmentProps> = ({
    cropShape,
    aspect,
    outputSize,
    image,
    onCancel,
    onConfirmed,
}) => {
    const [crop, setCrop] = React.useState<Crop>()
    const imageRef = useRef<HTMLImageElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [rotation, setRotation] = React.useState(0)

    const onCropComplete = (crop: Crop) => {
        const { width, height } = imageRef.current!
        setCanvasPreview(
            imageRef.current!,
            canvasRef.current!,
            convertToPixelCrop(crop, width, height),
            rotation
        )
    }

    const onImageLoaded = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height } = e.currentTarget
        const crop = makeAspectCrop(
            {
                unit: '%',
                width: 100,
            },
            aspect,
            width,
            height
        )

        setCrop(centerCrop(crop, width, height))
    }

    const setCanvasPreview = (
        image: HTMLImageElement,
        canvas: HTMLCanvasElement,
        crop: Crop,
        rotation: number
    ) => {
        const ctx = canvas.getContext('2d')
        if (!ctx) {
            return
        }

        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        canvas.width = crop.width * scaleX
        canvas.height = crop.height * scaleY

        ctx.imageSmoothingQuality = 'high'
        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY

        const shiftOriginX = canvas.width / 2
        const shiftOriginY = canvas.height / 2

        ctx.translate(shiftOriginX, shiftOriginY)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.translate(-shiftOriginX, -shiftOriginY)

        ctx.translate(-cropX, -cropY)

        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight
        )
    }

    const [loading, setLoading] = useState(false)
    const updateProfilePicture = useUserDetailsStore((state) => state.updateProfilePicture)
    const generateImage = (canvas: HTMLCanvasElement) => {
        const maxWidth = outputSize.width
        const maxHeight = outputSize.height

        const dataUrl = canvas.toDataURL('image/jpeg')
        const imageCompressor = new Image()
        imageCompressor.src = dataUrl

        imageCompressor.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                return
            }

            let width = imageCompressor.width
            let height = imageCompressor.height

            // Reduce resolution if either width or height exceeds the maximum
            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height)
                width *= ratio
                height *= ratio
            }

            canvas.width = width
            canvas.height = height

            ctx.drawImage(imageCompressor, 0, 0, width, height)

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        return
                    }
                    const file = new File([blob], 'profilePic', {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                    })

                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onloadend = () => {
                        const base64data = reader.result
                        if (typeof base64data === 'string') {
                            setLoading(true)
                            updateProfilePicture(file, (message) => {
                                enqueueSnackbar(message, {
                                    variant: 'success',
                                    autoHideDuration: 3000,
                                })
                                if (
                                    message === SuccessMessages.PROFILE_PICTURE_UPDATED_SUCCESSFULLY
                                ) {
                                    onConfirmed(StorageUtils.base64ToFile(base64data, 'profilePic'))
                                }
                                setLoading(false)
                            })
                        }
                    }
                },
                'image/jpeg',
                0.8 // Adjust compression quality if needed
            )
        }
    }

    return (
        <div className={'w-full h-full'}>
            <div className={'w-full h-full flex flex-col gap-4 justify-center pt-8'}>
                <div className={'flex flex-col gap-4 justify-center items-center'}>
                    <div
                        className={
                            'flex flex-col items-center bg-gray-500 rounded-3xl px-4 ' +
                            'shadow-md shadow-black/10 select-none'
                        }>
                        <Typography
                            component='h1'
                            variant='h5'
                            sx={{
                                padding: 1,
                                color: 'white',
                            }}>
                            Preview
                        </Typography>
                    </div>
                    <canvas
                        ref={canvasRef}
                        className={'border-2 border-slate-300 rounded-full w-40 h-40'}
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        flexGrow: 1,
                        borderRadius: '30px 30px 0 0',
                        padding: '20px 40px',
                    }}>
                    <ReactCrop
                        onChange={(_, percentageCrop) => {
                            setCrop(percentageCrop)
                        }}
                        onComplete={onCropComplete}
                        circularCrop={cropShape === 'round'}
                        crop={crop}
                        aspect={aspect}>
                        <img src={image ?? ''} alt={''} ref={imageRef} onLoad={onImageLoaded} />
                    </ReactCrop>
                    {/*Controls*/}
                    <div className={'flex flex-row gap-8 justify-center items-center mt-8'}>
                        <CropRotate />
                        <CustomSmoothSlider
                            value={rotation}
                            min={0}
                            max={360}
                            valueLabelDisplay='auto'
                            color='primary'
                            step={1}
                            onChange={(_event: Event, newValue: number | number[]) => {
                                const value = newValue as number
                                setRotation(value)
                                setCanvasPreview(
                                    imageRef.current!,
                                    canvasRef.current!,
                                    convertToPixelCrop(
                                        crop!,
                                        imageRef.current!.width,
                                        imageRef.current!.height
                                    ),
                                    value
                                )
                            }}
                        />
                    </div>
                    <div className={'flex flex-row gap-4 justify-end items-center'}>
                        <Button variant='outlined' color='error' onClick={onCancel}>
                            Cancel
                        </Button>
                        <LoadingButton
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                generateImage(canvasRef.current!)
                            }}
                            loading={loading}
                            loadingPosition={'start'}
                            startIcon={<Save />}>
                            Confirm
                        </LoadingButton>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default ImageCropFragment
