import { Shirt } from "@api"
import { Flex, Img, ImgProps } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }
    },
}
const MotionImage = motion<Omit<ImgProps, "transition">>(Img)

interface ImagesProps {
    images: Shirt["colors"]
    direction: number
    page: number
}

const Images = ({ images, direction, page }: ImagesProps) => {
    return (
        <Flex overflow="hidden" pos="relative" w="full" flex={1}>
            <AnimatePresence initial={false} custom={direction}>
                <MotionImage
                    key={page}
                    src={images[page].image}
                    alt={images[page].name}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    pos="absolute"
                    w="full"
                />
            </AnimatePresence>
        </Flex>
    )
}

export default Images
