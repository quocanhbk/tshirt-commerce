import { Address, setDefaultAddress } from "@api"
import { Box, Flex, VStack, Text, IconButton, Collapse, useOutsideClick } from "@chakra-ui/react"
import { useAppContext } from "@context"
import { useRef, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { FaBuilding, FaPhone, FaUser } from "react-icons/fa"
import { useMutation, useQueryClient } from "react-query"

interface AddressCardProps {
    addressInfo: Address
    isDefault?: boolean
    onDeleteClick?: () => void
    onEditClick?: () => void
    isSelecting?: boolean
}

const AddressCard = ({ addressInfo, isDefault, onEditClick, onDeleteClick, isSelecting }: AddressCardProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null)
    const { uid } = useAppContext()
    const qc = useQueryClient()
    const { mutate: mutateDefaultAddress } = useMutation(() => setDefaultAddress(uid, addressInfo.id), {
        onSuccess: () => {
            qc.invalidateQueries("default-address-id")
        },
    })
    useOutsideClick({
        ref: btnRef,
        handler: () => setIsOpen(false),
    })
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
            {!isSelecting && (
                <Flex direction="column" justify="space-between" align="flex-end">
                    <Box pos="relative">
                        <IconButton
                            icon={<BsThreeDots size="1.2rem" />}
                            aria-label="more"
                            rounded="full"
                            size="xs"
                            variant="ghost"
                            onClick={() => setIsOpen(!isOpen)}
                            ref={btnRef}
                        />
                        <Box pos="absolute" right={0}>
                            <Collapse in={isOpen}>
                                <Box w="max-content" py={2} px={4} rounded="lg" shadow="base" bg="gray.50">
                                    <VStack align="flex-start">
                                        <Text
                                            fontWeight="semibold"
                                            color="blue.400"
                                            cursor="pointer"
                                            onClick={onEditClick}
                                            w="full"
                                        >
                                            Sửa địa chỉ
                                        </Text>
                                        {!isDefault && (
                                            <Text
                                                fontWeight="semibold"
                                                color="green.400"
                                                cursor="pointer"
                                                onClick={() => mutateDefaultAddress()}
                                                w="full"
                                            >
                                                Chọn làm mặc định
                                            </Text>
                                        )}
                                        <Text
                                            fontWeight="semibold"
                                            color="red.400"
                                            cursor="pointer"
                                            onClick={onDeleteClick}
                                            w="full"
                                        >
                                            Xóa địa chỉ
                                        </Text>
                                    </VStack>
                                </Box>
                            </Collapse>
                        </Box>
                    </Box>
                    {isDefault && (
                        <Text color="green.400" fontWeight="semibold">
                            {"Mặc định"}
                        </Text>
                    )}
                </Flex>
            )}
        </Flex>
    )
}

export default AddressCard
