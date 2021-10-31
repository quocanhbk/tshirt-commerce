import { HStack, Heading, InputGroup, InputLeftElement, Input, Button, InputRightElement } from "@chakra-ui/react"
import { LoginModal } from "@components/shared"
import { useAppContext } from "@context"
import { useRouter } from "next/dist/client/router"
import React, { KeyboardEvent, useState } from "react"
import { BsSearch, BsCartFill, BsX } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
const Header = () => {
    const [loginModal, setLoginModal] = useState(false)
    const router = useRouter()
    const { user } = useAppContext()
    const [searchText, setSearchText] = useState("")
    const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            router.push(`?search=${searchText}`)
        }
    }
    return (
        <HStack spacing={4} p={4} align="center" bg="gray.800" justify="space-between">
            <Heading
                fontWeight="black"
                color="white"
                fontFamily="Racing Sans One"
                cursor="pointer"
                onClick={() => router.push("/")}
            >
                T-SHIRT
            </Heading>
            <InputGroup w="20rem">
                <InputLeftElement pointerEvents="none" children={<BsSearch size="1.2rem" />} />
                <Input
                    placeholder="Tìm kiếm sản phẩm"
                    rounded="full"
                    bg="white"
                    onKeyDown={handleKeydown}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
                {!!searchText && (
                    <InputRightElement
                        children={<BsX size="1.5rem" />}
                        onClick={() => router.push("/")}
                        cursor="pointer"
                    />
                )}
            </InputGroup>
            <HStack align="center">
                {!!user && (
                    <Button
                        leftIcon={<BsCartFill size="1.2rem" />}
                        variant="ghost"
                        color="white"
                        rounded="full"
                        px={4}
                        _hover={{ bg: "gray.600" }}
                        _active={{ bg: "gray.700" }}
                        ml="auto"
                        onClick={() => {
                            router.push("/cart")
                            setSearchText("")
                        }}
                    >
                        Giỏ hàng
                    </Button>
                )}
                <Button
                    leftIcon={<FaUser size="1.2rem" />}
                    variant="ghost"
                    px={4}
                    ml="auto"
                    bg="white"
                    rounded="full"
                    color="blue.400"
                    shadow="base"
                    onClick={() => {
                        if (!user) setLoginModal(true)
                        else router.push("/me/personal-information")
                    }}
                >
                    {user ? user.name : "Đăng nhập"}
                </Button>
            </HStack>
            <LoginModal isOpen={loginModal} onClose={() => setLoginModal(false)} />
        </HStack>
    )
}

export default Header
