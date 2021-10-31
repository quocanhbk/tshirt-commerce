import { Box, Flex, Text, Input, IconButton } from "@chakra-ui/react"
import React from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

interface QuantitySelectionProps {
    value: number
    onChange: (newValue: number) => void
    minValue?: number
    maxValue: number
    noTitle?: boolean
    size?: "small" | "medum"
}

export const QuantitySelection = ({
    value,
    onChange,
    minValue = 0,
    maxValue,
    noTitle,
    size,
}: QuantitySelectionProps) => {
    return (
        <Box>
            {!noTitle && <Text mb={1}>{"Số lượng"}</Text>}
            <Flex rounded="md" overflow="hidden" shadow="base">
                <IconButton
                    aria-label="decrease"
                    icon={<FaMinus />}
                    colorScheme="blue"
                    _focus={{ shadow: "none" }}
                    rounded="none"
                    disabled={value < minValue + 1}
                    variant="ghost"
                    onClick={() => onChange(value - 1)}
                    size={size === "small" ? "sm" : "md"}
                />
                <Input
                    value={value}
                    readOnly
                    variant="unstyled"
                    w={size === "small" ? "2rem" : "3rem"}
                    fontSize={size === "small" ? "md" : "xl"}
                    textAlign="center"
                    fontWeight="bold"
                    color="blue.400"
                />
                <IconButton
                    aria-label="increase"
                    icon={<FaPlus />}
                    colorScheme="blue"
                    _focus={{ shadow: "none" }}
                    rounded="none"
                    disabled={value > maxValue - 1}
                    variant="ghost"
                    onClick={() => onChange(value + 1)}
                    size={size === "small" ? "sm" : "md"}
                />
            </Flex>
        </Box>
    )
}

export default QuantitySelection
