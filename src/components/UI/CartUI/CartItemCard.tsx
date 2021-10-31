import { CartItemWithShirt, changeShirtQuantity, removeFromCart } from "@api"
import { Flex, Box, Img, Text, chakra, IconButton, VStack } from "@chakra-ui/react"
import { Price, QuantitySelection } from "@components/shared"
import { useAppContext } from "@context"
import { useEffect, useState } from "react"
import { BsX } from "react-icons/bs"
import { useMutation, useQueryClient } from "react-query"

interface CartItemCardProps {
    data: CartItemWithShirt
}

const CartItemCard = ({ data }: CartItemCardProps) => {
    const [currentQuantity, setCurrentQuantity] = useState(data.quantity)
    const [delaying, setDelaying] = useState(false)
    const qc = useQueryClient()
    const { uid } = useAppContext()
    const { mutate: mutateRemoveFromCart } = useMutation(() => removeFromCart(uid, data.id), {
        onSuccess: () => qc.invalidateQueries("cart"),
    })
    const { mutate: changeQuantity } = useMutation<unknown, unknown, number>(
        quantity => changeShirtQuantity(uid, { cartItemId: data.id, quantity }),
        {
            onSuccess: () => qc.invalidateQueries("cart"),
        }
    )
    const color = data.colors.find((color, idx) => idx === data.color)
    useEffect(() => {
        setDelaying(true)
    }, [currentQuantity])

    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (delaying) {
            timeout = setTimeout(() => {
                setDelaying(false)
            }, 500)
        } else {
            changeQuantity(currentQuantity)
        }
        return () => clearTimeout(timeout)
    }, [delaying, setDelaying])

    return (
        <Flex px={4} py={2} rounded="lg" shadow="base">
            <Box>
                <Img src={data.colors[data.color].image} w="5rem" />
            </Box>
            <Flex direction="column" flex={1} ml={4}>
                <Text fontWeight="bold" fontSize="lg">
                    {data.name}
                </Text>
                <Flex>
                    <Text mr={1}>Đơn giá:</Text> <Price value={data.price} />
                </Flex>
                <Text>
                    Kích cỡ:{" "}
                    <chakra.span fontWeight="bold" color="blue.400">
                        {data.size}
                    </chakra.span>
                </Text>
                <Flex align="center">
                    <Text mr={1}>Màu sắc: {color?.name}</Text>
                    <Box boxSize="1rem" rounded="full" bg={color?.code} border="1px" borderColor="gray.500" />
                </Flex>
            </Flex>
            <Box>
                <VStack h="full" justify="space-between" align="flex-end" spacing={2}>
                    <IconButton
                        icon={<BsX size="1.5rem" />}
                        colorScheme="red"
                        variant="ghost"
                        aria-label="delete-cart-item"
                        size="xs"
                        rounded="full"
                        onClick={() => mutateRemoveFromCart()}
                    />
                    <QuantitySelection
                        value={currentQuantity}
                        maxValue={99}
                        minValue={1}
                        onChange={setCurrentQuantity}
                        noTitle
                        size="small"
                    />
                    <Price value={data.price * data.quantity} />
                </VStack>
            </Box>
        </Flex>
    )
}

export default CartItemCard
