import { Shirt } from "@api"
import { Box, Flex, Img, Text, FlexProps } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import { Price } from "../../shared"

interface ShirtCardProps extends FlexProps {
    data: Shirt
}

export const ShirtCard = ({ data, ...rest }: ShirtCardProps) => {
    const { image, name, price } = data
    const router = useRouter()
    return (
        <Flex
            direction="column"
            rounded="lg"
            shadow="base"
            overflow="hidden"
            title={name}
            bg="white"
            cursor="pointer"
            onClick={() => router.push(`/shirt/${data.id}`)}
            {...rest}
        >
            <Flex justify="center" w="full">
                <Img src={image} alt={name} boxSize="12rem" />
            </Flex>
            <Box py={2} px={4}>
                <Text fontWeight="semibold" isTruncated>
                    {name}
                </Text>
                <Price value={price} />
            </Box>
        </Flex>
    )
}

export default ShirtCard
