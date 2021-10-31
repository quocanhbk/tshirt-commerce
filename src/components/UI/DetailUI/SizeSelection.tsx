import { Box, Flex, HStack, Text } from "@chakra-ui/layout"

export const sizes = ["S", "M", "L", "XL", "2XL"] as const

export type ShirtSize = typeof sizes[number]

interface SizeSelectionProps {
    selectedSize: ShirtSize
    setSelectedSize: (size: ShirtSize) => void
}

const SizeSelection = ({ selectedSize, setSelectedSize }: SizeSelectionProps) => {
    return (
        <Box>
            <Text mb={1}>{"Kích thước"}</Text>
            <HStack>
                {sizes.map(size => (
                    <Flex
                        key={size}
                        align="center"
                        justify="center"
                        boxSize="2.5rem"
                        rounded="lg"
                        bg={selectedSize === size ? "blue.400" : "gray.100"}
                        color={selectedSize === size ? "white" : "blue.400"}
                        fontWeight="bold"
                        cursor="pointer"
                        onClick={() => setSelectedSize(size)}
                        shadow="base"
                    >
                        {size}
                    </Flex>
                ))}
            </HStack>
        </Box>
    )
}

export default SizeSelection
