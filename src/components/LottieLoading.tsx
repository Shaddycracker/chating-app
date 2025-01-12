import React from 'react'
import lottieLoading from '../assets/lottie/loading.json'
import Lottie from 'lottie-react'

interface LottieLoadingProps {
    fullScreen?: boolean
    fullParent?: boolean
    horizontalCenter?: boolean
    verticalCenter?: boolean
}

const LottieLoading: React.FC<LottieLoadingProps> = ({
    fullScreen = false,
    fullParent = false,
    horizontalCenter = true,
    verticalCenter = true,
}) => {
    const containerClasses = [
        'flex',
        horizontalCenter ? 'justify-center' : '',
        verticalCenter ? 'items-center' : '',
        fullScreen ? 'w-screen h-screen' : '',
        fullParent ? 'w-full h-full' : '',
    ].join(' ')

    return (
        <div className={containerClasses}>
            <Lottie
                className={'max-h-[200px] max-w-[200px]'}
                animationData={lottieLoading}
                loop={true}
                autoPlay={true}
            />
        </div>
    )
}

export default LottieLoading
