import { OrderWithImage } from "@api"
import { Box, Flex, VStack, Text, Img, chakra, Tag, HStack } from "@chakra-ui/react"
import { Price } from "@components/shared"
import { format } from "date-fns"
import Image from "next/image"
import { BsCash, BsDot } from "react-icons/bs"

interface OrderCardProps {
    data: OrderWithImage
}

const OrderCard = ({ data }: OrderCardProps) => {
    return (
        <Box rounded="lg" shadow="base" w="full" overflow="hidden">
            <Flex w="full" justify="space-between" mb={2} px={4} py={2} borderBottom="1px" borderColor="blackAlpha.200">
                <Flex direction="column">
                    <Text fontSize="sm">Mã đơn hàng</Text>
                    <Text fontWeight="semibold" color="blue.500">
                        {data.id}
                    </Text>
                </Flex>
                <HStack spacing={8} flex={1} justify="flex-end">
                    <Flex direction="column">
                        <Text fontSize="sm">Ngày mua</Text>
                        <Text fontWeight="semibold">{format(new Date(data.createdDate), "dd/MM/yyyy")}</Text>
                    </Flex>
                    <Flex direction="column">
                        <Text fontSize="sm">Tổng giá</Text>
                        <Price value={data.totalPrice} />
                    </Flex>
                    <Flex direction="column">
                        <Text fontSize="sm">Tình trạng</Text>
                        <Tag
                            textTransform="uppercase"
                            colorScheme={
                                data.status === "pending" ? "orange" : data.status === "failed" ? "red" : "green"
                            }
                        >
                            {data.status}
                        </Tag>
                    </Flex>
                </HStack>
            </Flex>
            <Box px={4} py={2}>
                <VStack align="flex-start">
                    {data.cart.map(cartItem => (
                        <Flex
                            key={cartItem.id}
                            w="full"
                            borderBottom="1px"
                            borderColor="blackAlpha.200"
                            pb={2}
                            _last={{ borderColor: "transparent" }}
                        >
                            <Box>
                                <Image src={cartItem.color.image} width={80} height={80} />
                            </Box>
                            <Flex direction="column" flex={1} ml={4}>
                                <Text fontWeight="bold" fontSize="lg">
                                    {cartItem.name}
                                </Text>
                                <HStack spacing={0}>
                                    <Price value={cartItem.price} />
                                    <Box color="blackAlpha.800">
                                        <BsDot size="1.2rem" />
                                    </Box>
                                    <Text fontWeight="semibold">{cartItem.quantity}</Text>
                                    <Box color="blackAlpha.800">
                                        <BsDot size="1.2rem" />
                                    </Box>
                                    <Text fontWeight="bold" color="blue.400">
                                        {cartItem.size}
                                    </Text>
                                    <Box color="blackAlpha.800">
                                        <BsDot size="1.2rem" />
                                    </Box>
                                    <Box
                                        boxSize="1rem"
                                        rounded="full"
                                        bg={cartItem.color.code}
                                        border="1px"
                                        borderColor={cartItem.color.code === "#ffffff" ? "gray.500" : "transparent"}
                                    />
                                </HStack>
                                <Text>
                                    {data.paymentType === "cash" ? (
                                        <Flex align="center">
                                            <Flex justify="center" w="1.2rem" color="green.500">
                                                <BsCash size="1.5rem" />
                                            </Flex>
                                            <Text ml={2} fontSize="sm">
                                                Tiền mặt
                                            </Text>
                                        </Flex>
                                    ) : (
                                        <Flex align="center">
                                            <Box w="1.2rem">
                                                <Img
                                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg"
                                                    alt="momo"
                                                />
                                            </Box>
                                            <Text ml={2} fontSize="sm">
                                                MoMo
                                            </Text>
                                        </Flex>
                                    )}
                                </Text>
                            </Flex>
                            <Flex direction="column">
                                <Price value={cartItem.quantity * cartItem.price} />
                            </Flex>
                        </Flex>
                    ))}
                </VStack>
            </Box>
        </Box>
    )
}

export default OrderCard
