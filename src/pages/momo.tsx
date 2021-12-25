import { updateOrderStatus } from "@api"
import { Box, Flex, VStack, Heading, Text, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"

const Momo = ({statusText}) => {
    const router = useRouter()
    return (
        <Flex direction="column" align="center" flex={1} bg="gray.50">
            <Box w="full" maxW="56rem" bg="white" flex={1} p={4}>
                <Box mb={8}>
                    <Heading fontSize="lg" mb={2} alignContent="middle">
                        {statusText}
                    </Heading>
                    Bấm vào <a onClick={() => router.push(`/`)}>đây</a> để trở lại
                </Box>
            </Box>
        </Flex>
    )
}

Momo.getInitialProps = async ({query}) => {
    const { orderId, resultCode, message } = query
    if (resultCode == null) {
        return { status: null }
    }
    if (resultCode === '0') {
        await updateOrderStatus(orderId, 'success')
        return { statusText: 'Mua hàng thành công'}
    }
    await updateOrderStatus(orderId, 'failed')
    return { statusText: 'Mua hàng thất bại'}
}

export default Momo
