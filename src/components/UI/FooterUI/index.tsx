import { Box, Flex, Text } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import { FaGithub } from "react-icons/fa"
interface FooterUIProps {}

const FooterUI = ({}: FooterUIProps) => {
    return (
        <Flex w="full" p={8} bg="gray.700" color="white" justify="space-between" align="center">
            <Box flex={1}>
                <Text>
                    <chakra.span fontFamily="Racing Sans One">T-SHIRT</chakra.span>{" "}
                    <chakra.span fontSize="sm" fontStyle="italic" fontWeight={500}>
                        E-COMMERCE PLATFORM
                    </chakra.span>
                </Text>
            </Box>
            <Box>
                <a href="https://github.com/quocanhbk/tshirt-commerce" target="_blank" rel="nonreferrer">
                    <FaGithub size="1.5rem" />
                </a>
            </Box>
            <Box flex={1}>
                <Text w="full" textAlign="right" fontWeight="semibold" fontStyle="italic">
                    E-COMMERCE MINI PROJECT
                </Text>
            </Box>
        </Flex>
    )
}

export default FooterUI
