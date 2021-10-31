import { PaymentType } from "@api"
import { Box, Heading, RadioGroup, VStack, Radio, Flex, Img, Text } from "@chakra-ui/react"
import { BsCash } from "react-icons/bs"

interface PaymentProps {
    currentPayment: PaymentType
    setCurrentPayment: (payment: PaymentType) => void
}

const Payment = ({ currentPayment, setCurrentPayment }: PaymentProps) => {
    return (
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
                        <Radio value="momo" isDisabled={true}>
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
    )
}

export default Payment