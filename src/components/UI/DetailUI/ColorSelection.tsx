import { Box, Flex, HStack, Text } from "@chakra-ui/layout"

interface SizeSelectionProps {
    colors: {
        code: string
        name: string
    }[]
    selectedColor: number
    setSelectedColor: (color: number) => void
}

const ColorSelection = ({ colors, selectedColor, setSelectedColor }: SizeSelectionProps) => {
    return (
        <Box>
            <Text mb={1}>{"Màu sắc"}</Text>
            <HStack>
                {colors.map((color, idx) => (
                    <Flex
                        key={color.code}
                        align="center"
                        justify="center"
                        boxSize="2.5rem"
                        rounded="lg"
                        bg={color.code}
                        color="white"
                        fontWeight="bold"
                        cursor="pointer"
                        onClick={() => setSelectedColor(idx)}
                        shadow="base"
                        border="2px"
                        borderColor={idx === selectedColor ? "blue.400" : "transparent"}
                    ></Flex>
                ))}
            </HStack>
        </Box>
    )
}

export default ColorSelection
