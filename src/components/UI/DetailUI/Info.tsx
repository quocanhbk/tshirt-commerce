import { Shirt } from "@api"
import { VStack, Heading, Flex, Button, Text } from "@chakra-ui/react"
import { Price, QuantitySelection } from "@components/shared"
import React from "react"
import ColorSelection from "./ColorSelection"
import SizeSelection, { ShirtSize } from "./SizeSelection"

interface InfoProps {
    data: Shirt
    selectedSize: ShirtSize
    setSelectedSize: (size: ShirtSize) => void
    quantity: number
    setQuantity: (quantity: number) => void
    selectedColor: number
    setSelectedColor: (color: number) => void
    onAddToCart: () => void
    isAddingToCart?: boolean
}

const Info = ({
    data,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    selectedColor,
    setSelectedColor,
    onAddToCart,
    isAddingToCart,
}: InfoProps) => {
    return (
        <VStack flex={3} direction="column" ml={8} align="flex-start" py={4}>
            <Heading fontSize="xl">{data.name}</Heading>
            <Text>{`Thương hiệu: ${data.brand}`}</Text>
            <Text>{`Chất liệu: ${data.material}`}</Text>
            <Price value={data.price} fontSize="2xl" fontWeight="bold" />
            <SizeSelection selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            <ColorSelection colors={data.colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            <Flex align="flex-end">
                <QuantitySelection value={quantity} onChange={setQuantity} minValue={1} maxValue={99} />
                <Button ml={8} colorScheme="red" px={8} onClick={onAddToCart} isLoading={isAddingToCart}>
                    Thêm vào giỏ hàng
                </Button>
            </Flex>
        </VStack>
    )
}

export default Info
