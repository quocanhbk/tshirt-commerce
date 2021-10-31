import { getCartWithImage, getDefaultAddress } from "@api"
import { Box, Flex, VStack, Heading, Text, Button, Radio, RadioGroup, Img } from "@chakra-ui/react"
import { Price } from "@components/shared"
import { useAppContext } from "@context"
import { useState } from "react"
import { BsCash } from "react-icons/bs"
import { useMutation, useQuery } from "react-query"
import { PaymentType } from "src/api/order"
import AddressCard from "./AddressCard"
import CartItemCard from "./CartItemCard"

const CartUI = () => {
    const { uid } = useAppContext()
    const { data: cart } = useQuery("cart", () => getCartWithImage(uid), { initialData: [], enabled: !!uid })
    const { data: address, isLoading: isGettingAddress } = useQuery("default-address", () => getDefaultAddress(uid), {
        enabled: !!uid,
    })

    const [currentPayment, setCurrentPayment] = useState<PaymentType>("momo")
    return (
        <Flex direction="column" align="center" flex={1} bg="gray.50">
            <Box w="full" maxW="56rem" bg="white" flex={1} p={4}>
                <Box mb={8}>
                    <Heading fontSize="lg" mb={2}>
                        GIỎ HÀNG
                    </Heading>
                    <VStack align="stretch" spacing={4} mb={2}>
                        {cart!.map(cartItem => (
                            <CartItemCard key={cartItem.id} data={cartItem} />
                        ))}
                    </VStack>
                    <Flex w="full" justify="flex-end" px={4}>
                        <Text fontSize="xl">Tổng giá:</Text>
                        <Box>
                            <Price
                                fontSize="xl"
                                value={cart!.reduce((price, item) => price + item.price * item.quantity, 0)}
                            />
                        </Box>
                    </Flex>
                </Box>
                <Box mb={8}>
                    <Heading fontSize="lg" mb={2}>
                        ĐỊA CHỈ GIAO HÀNG
                    </Heading>
                    <Box>
                        {isGettingAddress ? (
                            <Text>Đang lấy địa chỉ</Text>
                        ) : address ? (
                            <AddressCard addressInfo={address} />
                        ) : (
                            <Text>Tạo địa chỉ</Text>
                        )}
                    </Box>
                </Box>
                <Box mb={8}>
                    <Heading fontSize="lg" mb={2}>
                        PHƯƠNG THỨC THANH TOÁN
                    </Heading>
                    <Box p={4} rounded="lg" shadow="base">
                        <RadioGroup value={currentPayment} onChange={(v: PaymentType) => setCurrentPayment(v)}>
                            <VStack align="flex-start">
                                <Radio value="cash">
                                    <Flex align="center">
                                        <Flex justify="center" w="2rem">
                                            <BsCash size="1.5rem" />
                                        </Flex>
                                        <Text ml={2}>Thanh toán tiền mặt khi nhận hàng</Text>
                                    </Flex>
                                </Radio>
                                <Radio value="momo" isDisabled>
                                    <Flex align="center">
                                        <Box w="2rem">
                                            <Img
                                                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg"
                                                alt="momo"
                                            />
                                        </Box>
                                        <Text ml={2}>Thanh toán bằng MoMo</Text>
                                    </Flex>
                                </Radio>
                            </VStack>
                        </RadioGroup>
                    </Box>
                </Box>
                <Button w="full" colorScheme="red" mb={8} size="lg">
                    ĐẶT MUA
                </Button>
            </Box>
        </Flex>
    )
}

export default CartUI
