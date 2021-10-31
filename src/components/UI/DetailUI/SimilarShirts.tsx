import { Box, Heading, HStack } from "@chakra-ui/react"
import { Shirt } from "@api"
import ShirtCard from "../HomeUI/ShirtCard"
interface SimilarShirtsProps {
    data: Shirt[]
}

const SimilarShirts = ({ data }: SimilarShirtsProps) => {
    return (
        <Box w="full" overflow="hidden" mb={8}>
            <Heading fontSize="lg">SẢN PHẨM TƯƠNG TỰ</Heading>
            <Box w="full" overflow="auto">
                <HStack spacing={4}>
                    {data.map(shirt => (
                        <ShirtCard key={shirt.id} data={shirt} flexShrink={0} w="12rem" />
                    ))}
                </HStack>
            </Box>
        </Box>
    )
}

export default SimilarShirts
