import { Address, setDefaultAddress } from "@api"
import { Box, Flex, VStack, Text, IconButton, Collapse, useOutsideClick } from "@chakra-ui/react"
import { useAppContext } from "@context"
import { useRef, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { FaBuilding, FaPhone, FaUser } from "react-icons/fa"
import { useMutation, useQueryClient } from "react-query"

interface AddressCardProps {
    addressInfo: Address
}

const AddressCard = ({ addressInfo }: AddressCardProps) => {
    return (
        <Flex justify="space-between" p={2} rounded="lg" shadow="base">
            <VStack align="flex-start" spacing={2} flex={1}>
                <Flex align="center">
                    <Box flexShrink={0}>
                        <FaUser size="1rem" />
                    </Box>

                    <Text ml={2}>{addressInfo.name}</Text>
                </Flex>
                <Flex align="center">
                    <Box flexShrink={0}>
                        <FaBuilding size="1rem" />
                    </Box>
                    <Text ml={2}>{addressInfo.address}</Text>
                </Flex>
                <Flex align="center">
                    <Box flexShrink={0}>
                        <FaPhone size="1rem" />
                    </Box>

                    <Text ml={2}>{addressInfo.phone}</Text>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default AddressCard
