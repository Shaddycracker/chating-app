import React, { useCallback, useEffect, useRef, useState } from 'react'
import image from '../../assets/auth/signin_image.png'
import logo from '../../assets/logo.png'

const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const glassDegreesRef = useRef(0)
    const elementDegreesRef = useRef(0)
    const previousDegreesRef = useRef(0)
    const elementSpeedRef = useRef(0.2)
    const rotationSpeedRef = useRef(0)

    const drawCircle = useCallback(
        (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
            ctx.save()
            ctx.filter = 'blur(150px)'
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fillStyle = color
            ctx.fill()
            ctx.closePath()
            ctx.restore()
        },
        []
    )

    const drawImage = useCallback(
        (ctx: CanvasRenderingContext2D, x: number, y: number, image: string, size: number) => {
            const img = new Image()
            img.src = image
            ctx.drawImage(img, x, y, size, size)
        },
        []
    )

    const { left, top, width, height } = canvasRef.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    }
    const { centerX, centerY } = {
        centerX: left + width / 2,
        centerY: top + height / 2,
    }

    const [mouseState, setMouseState] = useState({
        clicked: false,
        clickedX: 0,
        clickedY: 0,
    })

    const angle = 45 // rotation angle in elementDegrees
    const rad = angle * (Math.PI / 180) // convert an angle to radians

    useEffect(() => {
        const animate = () => {
            const canvas = canvasRef.current
            if (!canvas) return

            const ratio = window.devicePixelRatio
            canvas.width = window.innerWidth * ratio
            canvas.height = window.innerHeight * ratio
            canvas.style.width = `${window.innerWidth}px`
            canvas.style.height = `${window.innerHeight}px`

            const ctx = canvas?.getContext('2d')
            if (!ctx) return
            ctx.scale(ratio, ratio)

            const glassRadius = Math.min(canvas.width, canvas.height) / 3

            const glass1 = Math.cos(glassDegreesRef.current * (Math.PI / 180)) * glassRadius
            const glass2 = Math.sin((glassDegreesRef.current + 120) * (Math.PI / 180)) * glassRadius
            const glass3 = Math.cos((glassDegreesRef.current + 240) * (Math.PI / 180)) * glassRadius

            const elementRadius = Math.min(canvas.width, canvas.height) / 5
            //image
            const imageX = Math.cos(elementDegreesRef.current * (Math.PI / 180)) * elementRadius
            const imageY =
                Math.sin(elementDegreesRef.current * (Math.PI / 180)) * elementRadius * 1.7 - 50
            const rotatedImageX = imageX * Math.cos(rad) - imageY * Math.sin(rad)
            const rotatedImageY = imageX * Math.sin(rad) + imageY * Math.cos(rad)

            //logo
            const logoX =
                Math.cos((elementDegreesRef.current + 180) * (Math.PI / 180)) * elementRadius
            const logoY =
                Math.sin((elementDegreesRef.current + 180) * (Math.PI / 180)) *
                    elementRadius *
                    1.6 -
                50
            const rotatedLogoX = logoX * Math.cos(rad) - logoY * Math.sin(rad)
            const rotatedLogoY = logoX * Math.sin(rad) + logoY * Math.cos(rad)

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawCircle(ctx, glass1 + 300, 300, 300, 'rgb(230,191,255)')
            drawCircle(ctx, 500, glass2 + 200, 200, 'rgb(255,190,190)')
            drawCircle(ctx, glass3 + 300, 300, 300, 'rgb(188,216,255)')
            drawImage(
                ctx,
                rotatedImageX + window.innerWidth / 3.2,
                rotatedImageY + window.innerHeight / 2.5,
                image,
                50 * Math.sin(elementDegreesRef.current * (Math.PI / 180)) + 200
            )
            drawImage(
                ctx,
                rotatedLogoX + window.innerWidth / 3.1,
                rotatedLogoY + window.innerHeight / 2.5,
                logo,
                50 * Math.sin((elementDegreesRef.current + 180) * (Math.PI / 180)) + 200
            )

            glassDegreesRef.current = (glassDegreesRef.current + 0.2) % 360

            if (rotationSpeedRef.current !== 0) {
                elementDegreesRef.current =
                    (elementDegreesRef.current + rotationSpeedRef.current) % 360
            } else {
                elementDegreesRef.current =
                    (elementDegreesRef.current + elementSpeedRef.current) % 360
            }

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationId)
    }, [drawCircle, drawImage, rad])

    const mouseFlickerTime = useRef(0)

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        setMouseState((prev) => ({
            ...prev,
            clicked: true,
            clickedX: e.clientX,
            clickedY: e.clientY,
        }))
        previousDegreesRef.current = elementDegreesRef.current
        rotationSpeedRef.current = 0
        mouseFlickerTime.current = Date.now()
    }, [])

    const handleMouseUp = useCallback(() => {
        setMouseState((prev) => ({ ...prev, clicked: false }))
        const elapsed = Date.now() - mouseFlickerTime.current

        const dx = elementDegreesRef.current - previousDegreesRef.current
        rotationSpeedRef.current = dx / elapsed
    }, [])

    const handleMouseLeave = useCallback(() => {
        elementSpeedRef.current = 0.2
        setMouseState((prev) => ({ ...prev, clicked: false }))
    }, [])

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            const { clientX, clientY } = e

            if (clientX > 300 && clientX < 1000 && clientY > 50 && clientY < 700) {
                document.body.style.cursor = 'pointer'
                elementSpeedRef.current = 0
            } else {
                document.body.style.cursor = 'default'
                elementSpeedRef.current = 0.2
            }

            if (!mouseState.clicked) return

            const dx = clientX - centerX
            const dy = clientY - centerY
            const angle =
                Math.atan2(dy, dx) -
                Math.atan2(mouseState.clickedY - centerY, mouseState.clickedX - centerX)
            const traversedDegrees = (angle * 180) / Math.PI

            elementDegreesRef.current = previousDegreesRef.current + traversedDegrees
        },
        [mouseState, centerX, centerY]
    )

    return (
        <>
            <div
                className={'absolute border-4 border-purple-300 border-dashed w-[24rem] h-[40rem]'}
                style={{
                    left: '40%',
                    top: 'calc(50% - 30px)',
                    borderRadius: '100% / 125% 125% 80%  80%',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    zIndex: -1,
                }}
            />
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
        </>
    )
}

export default Canvas
