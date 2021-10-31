import { Box, Flex } from "@chakra-ui/react"
import { useAppContext } from "@context"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import NavigationBox from "./NavigationBox"

interface MelayoutProps {
    children: ReactNode
}

const MeLayout = ({ children }: MelayoutProps) => {
    const router = useRouter()
    const { user, loading } = useAppContext()
    useEffect(() => {
        if (!loading && !user) router.push("/")
    }, [])
    return (
        <Flex direction="column" w="full" align="center" flex={1}>
            <Flex w="full" maxW="56rem" flex={1} bg="white" p={4}>
                <Box flex={1}>
                    <NavigationBox />
                </Box>
                <Box flex={3} ml={4} rounded="lg" shadow="base" p={4}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    )
}

export default MeLayout
