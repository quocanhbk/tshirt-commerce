import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import { auth } from "@firebaseConfig"
import { useRouter } from "next/dist/client/router"
import NextLink from "./NextLink"
interface NavigationBoxProps {}

const links = [
    { path: "/me/personal-information", text: "Thông tin cá nhân" },
    { path: "/me/address", text: "Địa chỉ thanh toán" },
    { path: "/me/order", text: "Danh sách đơn hàng" },
]

const NavigationBox = ({}: NavigationBoxProps) => {
    const router = useRouter()
    return (
        <Box bg="white" shadow="base" p={4} rounded="lg">
            <Heading fontSize="lg" textTransform="uppercase" mb={4}>
                Tài khoản
            </Heading>
            <VStack align="flex-start" spacing={4}>
                {links.map(link => (
                    <NextLink
                        key={link.path}
                        href={link.path}
                        text={link.text}
                        active={router.pathname.includes(link.path)}
                    />
                ))}
                <Text
                    cursor="pointer"
                    color="red.500"
                    fontWeight="semibold"
                    onClick={() => {
                        auth.signOut()
                        router.push("/")
                    }}
                    borderTop="1px"
                    borderColor="blackAlpha.200"
                    w="full"
                    pt={2}
                >
                    Đăng xuất
                </Text>
            </VStack>
        </Box>
    )
}

export default NavigationBox
