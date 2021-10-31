import { Flex, Box, Img, Text } from "@chakra-ui/react"
import React from "react"

interface LoginTagProps {
    img: string
    label: string
    onClick: () => void
}

export const LoginTag = ({ img, label, onClick }: LoginTagProps) => {
    return (
        <Flex align="center" shadow="base" rounded="lg" w="full" py={2} px={4} cursor="pointer" onClick={onClick}>
            <Box rounded="full" cursor="pointer" overflow="hidden" boxSize="2rem">
                <Img src={img} alt={label} />
            </Box>
            <Text ml={4}>Đăng nhập bằng {label}</Text>
        </Flex>
    )
}

export default LoginTag
