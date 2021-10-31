import { getShirts } from "@api"
import { useQuery } from "react-query"
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import ShirtCard from "./ShirtCard"
import Banner from "./Banner"
interface HomeUIProps {}

const HomeUI = ({}: HomeUIProps) => {
    const { data } = useQuery("shirts", getShirts)
    return (
        <Flex direction="column" align="center" flex={1} p={4} bg="gray.50">
            <Box w="full" maxW="56rem">
                <Banner />
                <Box mt={4}>
                    <Heading size="medium" mb={4}>
                        Sản phẩm nổi bật
                    </Heading>
                    <SimpleGrid columns={4} spacing={8}>
                        {data?.map(shirt => (
                            <ShirtCard key={shirt.id} data={shirt} />
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>
        </Flex>
    )
}

export default HomeUI
