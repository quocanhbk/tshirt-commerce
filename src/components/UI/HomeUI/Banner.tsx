import { getShirts } from "@api"
import { Img, Box, Flex, FlexProps } from "@chakra-ui/react"
import { motion } from "framer-motion"
import router from "next/router"
import { useQuery } from "react-query"

interface BannerProps {}

const MotionFlex = motion<Omit<FlexProps, "transition">>(Flex)

const Banner = ({}: BannerProps) => {
    const { data } = useQuery("shirts", getShirts)
    return (
        <Box w="full" h="10rem" overflow="hidden">
            <MotionFlex
                w="200%"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    ease: "linear",
                    duration: 5,
                    loop: Infinity,
                }}
            >
                <Flex justify="space-around" flexShrink={0} w="50%">
                    {data!.slice(0, 5).map(shirt => (
                        <Box
                            key={shirt.id}
                            boxSize="10rem"
                            overflow="hidden"
                            bg="white"
                            flexShrink={0}
                            cursor="pointer"
                            onClick={() => router.push(`/shirt/${shirt.id}`)}
                        >
                            <Img src={shirt.image} alt={shirt.name} h="full" />
                        </Box>
                    ))}
                </Flex>
                <Flex justify="space-around" flexShrink={0} w="50%">
                    {data!.slice(0, 5).map(shirt => (
                        <Box
                            key={shirt.id}
                            boxSize="10rem"
                            overflow="hidden"
                            bg="white"
                            flexShrink={0}
                            cursor="pointer"
                        >
                            <Img src={shirt.image} alt={shirt.name} h="full" />
                        </Box>
                    ))}
                </Flex>
            </MotionFlex>
        </Box>
    )
}

export default Banner
