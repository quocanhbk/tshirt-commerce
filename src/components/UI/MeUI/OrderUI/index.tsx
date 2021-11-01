import { getOrdersWithImage } from "@api"
import { Box, Heading, VStack } from "@chakra-ui/react"
import { useAppContext } from "@context"
import { useQuery } from "react-query"
import OrderCard from "./OrderCard"

const OrderUI = () => {
    const { uid } = useAppContext()
    const { data } = useQuery("orders", () => getOrdersWithImage(uid), {
        enabled: !!uid,
        initialData: [],
    })
    return (
        <Box>
            <Heading fontSize="lg" textTransform="uppercase" mb={4}>
                DANH SÁCH ĐƠN HÀNG
            </Heading>
            <VStack align="flex-start" spacing={4}>
                {data!.map(order => (
                    <OrderCard key={order.id} data={order} />
                ))}
            </VStack>
        </Box>
    )
}

export default OrderUI
