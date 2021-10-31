import { getShirts } from "@api"
import { Img, Box, Flex, FlexProps } from "@chakra-ui/react"
import { shuffle } from "@utils"
import { motion } from "framer-motion"
import router, { useRouter } from "next/router"
import { useQuery } from "react-query"

interface BannerProps {}

const images = [
    "https://hstatic.net/640/1000004640/1/2016/4-7/do-003_f393805d-b3f4-491a-541f-3143d43ad4ee_grande.png",
    "https://product.hstatic.net/1000004640/product/trang-haveaniceday_grande.jpg",
    "https://hstatic.net/640/1000004640/1/2016/4-8/do-ao-tron-do-copy2_grande.png",
    "https://media.coolmate.me/uploads/July2021/9-0_copy_92.jpg",
    "https://hstatic.net/640/1000004640/1/2016/4-8/kem-_a1bad425-06d9-49d8-5eec-bc354d032e03_d8b727e8-7253-42ec-487d-10cd98a8e47a_fd811896-75e4-4669-4128-a9aa6b127f06_grande.png",
]

const MotionFlex = motion<Omit<FlexProps, "transition">>(Flex)

const Banner = ({}: BannerProps) => {
    const { data } = useQuery("shirts", getShirts)
    const shuffleData = shuffle(data!).slice(0, 5)
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
                    {shuffleData.map(shirt => (
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
                    {shuffleData.map(shirt => (
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
