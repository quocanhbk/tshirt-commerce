import { addToCart, getShirt, getSimilarShirts } from "@api"
import { Flex, Box, Text, HStack } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { useMutation, useQuery } from "react-query"
import Images from "./Images"
import { AiOutlineHeart } from "react-icons/ai"
import { FaFacebook, FaInstagram, FaLink, FaTwitter } from "react-icons/fa"
import Info from "./Info"
import Description from "./Description"
import SimilarShirts from "./SimilarShirts"
import { ShirtSize } from "./SizeSelection"
import { useAppContext } from "@context"
import { nanoid } from "nanoid"
import { useChakraToast } from "@hooks"

interface DetailUIProps {
    id: string | undefined
}

const DetailUI = ({ id }: DetailUIProps) => {
    const { uid, setLoginModal } = useAppContext()
    const toast = useChakraToast()
    const { data } = useQuery(["shirt", id], () => getShirt(id!), {
        enabled: !!id,
    })
    const { data: similarShirts } = useQuery(["shirt", "type", id], () => getSimilarShirts(id!), {
        enabled: !!id,
    })
    const [selectedSize, setSelectedSize] = useState<ShirtSize>("M")
    const [[page, direction], setPage] = useState([0, 0])
    const paginate = (index: number) => {
        setPage([index, index - page])
    }
    const [quantity, setQuantity] = useState(1)
    const buying = useRef(false)

    const { mutate, isLoading } = useMutation(
        () =>
            addToCart(uid, {
                id: nanoid(),
                shirtId: id!,
                color: data!.colors[page],
                size: selectedSize,
                quantity,
            }),
        {
            onSuccess: () => {
                toast({ status: "success", title: "Thêm vào giỏ hàng thành công!" })
            },
        }
    )
    const handleAddToCart = () => {
        if (!!uid) {
            mutate()
        } else {
            buying.current = true
            setLoginModal(true)
        }
    }
    useEffect(() => {
        if (buying.current) {
            mutate()
            buying.current = false
        }
    }, [uid, mutate])

    useEffect(() => {
        setQuantity(1)
        setSelectedSize("L")
        setPage([0, 0])
    }, [id])
    return (
        <Flex direction="column" align="center" flex={1} p={4} bg="gray.50">
            {data && similarShirts ? (
                <Box w="full" maxW="56rem" bg="white">
                    <Flex mb={8}>
                        <Flex direction="column" flex={2}>
                            <Images images={data.colors} page={page} direction={direction} />
                            <Flex justify="space-between" mt={2}>
                                <HStack align="center">
                                    <Text>Chia sẻ:</Text>
                                    <Box>
                                        <FaFacebook />
                                    </Box>
                                    <Box>
                                        <FaTwitter />
                                    </Box>
                                    <Box>
                                        <FaInstagram />
                                    </Box>
                                    <Box onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                        <FaLink />
                                    </Box>
                                </HStack>
                                <Flex align="center" py={1} px={2} rounded="md" cursor="pointer" userSelect="none">
                                    <Box mr={2}>
                                        <AiOutlineHeart />
                                    </Box>
                                    <Text>Thích</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Info
                            data={data}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                            selectedColor={page}
                            setSelectedColor={paginate}
                            onAddToCart={handleAddToCart}
                            isAddingToCart={isLoading}
                        />
                    </Flex>
                    <SimilarShirts data={similarShirts} />
                    <Description data={data.description} />
                </Box>
            ) : null}
        </Flex>
    )
}

export default DetailUI
