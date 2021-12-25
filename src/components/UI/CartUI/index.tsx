import { Address, getCartWithImage, createOrder, Order } from "@api"
import { Box, Flex, VStack, Heading, Text, Button } from "@chakra-ui/react"
import { Price } from "@components/shared"
import { useAppContext } from "@context"
import { useChakraToast } from "@hooks"
import { nanoid } from "nanoid"
import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { PaymentType } from "src/api/order"
import AddressSelector from "./AddressSelector"
import CartItemCard from "./CartItemCard"
import Payment from "./Payment"

const CartUI = () => {
    const { uid } = useAppContext()
    const router = useRouter()
    const [currentPayment, setCurrentPayment] = useState<PaymentType>("cash")
    const [currentAddress, setCurrentAddress] = useState<Address | undefined>(undefined)

    const { data: cart, isLoading: isGettingCart } = useQuery("cart", () => getCartWithImage(uid), {
        initialData: [],
        enabled: !!uid,
    })
    const totalPrice = cart!.reduce((price, item) => price + item.price * item.quantity, 0)
    const buyable = !!currentAddress && !!cart && cart.length > 0
    const toast = useChakraToast()
    const { mutate: mutateBuy, isLoading: isBuying } = useMutation<
        unknown,
        unknown,
        { orderId: string; orderInfo: Omit<Order, "status" | "id"> }
    >(input => createOrder(input.orderId, input.orderInfo), {
        onSuccess: (response) => {
            if (response == null) {
                router.push("/me/order")
            } else {
                router.push(response as string)
            }
            toast({ status: "success", title: "Mua hàng thành công!" })
        },
        onError: () => {
            toast({ status: "error", title: "Mua hàng thất bại!", message: "Vui lòng thử lại sau" })
        },
    })

    const handleBuy = () => {
        const orderId = nanoid()
        mutateBuy({
            orderId,
            orderInfo: {
                buyerId: uid,
                addressInfo: currentAddress!,
                paymentType: currentPayment,
                cart: cart!.map(cartItem => ({
                    id: cartItem.id,
                    shirtId: cartItem.shirtId,
                    color: cartItem.color,
                    size: cartItem.size,
                    quantity: cartItem.quantity,
                })),
                totalPrice,
                createdDate: new Date().toString(),
            },
        })
    }

    return (
        <Flex direction="column" align="center" flex={1} bg="gray.50">
            <Box w="full" maxW="56rem" bg="white" flex={1} p={4}>
                <Box mb={8}>
                    <Heading fontSize="lg" mb={2}>
                        GIỎ HÀNG
                    </Heading>
                    <VStack align="stretch" spacing={4} mb={2}>
                        {isGettingCart ? (
                            <Text>Đang lấy giỏ hàng</Text>
                        ) : cart!.length > 0 ? (
                            cart!.map(cartItem => <CartItemCard key={cartItem.id} data={cartItem} />)
                        ) : (
                            <Text>Bạn không có sản phẩm nào trong giỏ hàng</Text>
                        )}
                    </VStack>
                    {cart && cart.length > 0 && (
                        <Flex w="full" justify="flex-end" px={4}>
                            <Text fontSize="xl" mr={2}>
                                Tổng giá:
                            </Text>
                            <Box>
                                <Price fontSize="xl" value={totalPrice} />
                            </Box>
                        </Flex>
                    )}
                </Box>
                {cart && cart.length > 0 && (
                    <>
                        <AddressSelector
                            uid={uid}
                            currentAddress={currentAddress}
                            setCurrentAddress={setCurrentAddress}
                        />
                        <Payment currentPayment={currentPayment} setCurrentPayment={setCurrentPayment} />
                        <Button
                            w="full"
                            colorScheme="red"
                            mb={8}
                            size="lg"
                            isDisabled={!buyable}
                            onClick={handleBuy}
                            isLoading={isBuying}
                        >
                            ĐẶT MUA
                        </Button>
                    </>
                )}
            </Box>
        </Flex>
    )
}

export default CartUI
