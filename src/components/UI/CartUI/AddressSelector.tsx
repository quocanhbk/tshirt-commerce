import { Address, getDefaultAddress } from "@api"
import { Box, Flex, Heading, Button, Text, chakra } from "@chakra-ui/react"
import React, { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import AddAddressModal from "../MeUI/AddressUI/AddAddressModal"
import AddressCard from "./AddressCard"
import SelectAddressModal from "./SelectAddressModal"

interface AddressSelectorProps {
    uid: string
    currentAddress: Address | undefined
    setCurrentAddress: (address: Address) => void
}

const AddressSelector = ({ uid, currentAddress, setCurrentAddress }: AddressSelectorProps) => {
    const [isCreatingAddress, setIsCreatingAddress] = useState(false)
    const [isSelectingAddress, setIsSelectingAddress] = useState(false)
    const qc = useQueryClient()
    const { isLoading: isGettingAddress } = useQuery("default-address", () => getDefaultAddress(uid), {
        enabled: !!uid,
        onSuccess: setCurrentAddress,
    })
    return (
        <Box mb={8}>
            <Flex w="full" justify="space-between">
                <Heading fontSize="lg" mb={2}>
                    ĐỊA CHỈ GIAO HÀNG
                </Heading>
                <Button size="sm" variant="ghost" onClick={() => setIsSelectingAddress(true)}>
                    Đổi địa chỉ
                </Button>
            </Flex>
            <Box>
                {isGettingAddress ? (
                    <Text>Đang lấy địa chỉ</Text>
                ) : currentAddress ? (
                    <AddressCard addressInfo={currentAddress} />
                ) : (
                    <Text>
                        Bạn chưa có địa chỉ nào.{" "}
                        <chakra.span
                            fontWeight="semibold"
                            color="blue.500"
                            cursor="pointer"
                            onClick={() => setIsCreatingAddress(true)}
                        >
                            Tạo địa chỉ
                        </chakra.span>
                    </Text>
                )}
            </Box>
            <AddAddressModal
                isOpen={isCreatingAddress}
                onClose={() => setIsCreatingAddress(false)}
                onSuccess={() => qc.invalidateQueries("default-address")}
            />
            <SelectAddressModal
                isOpen={isSelectingAddress}
                onClose={() => setIsSelectingAddress(false)}
                onSelectAddress={address => {
                    setCurrentAddress(address)
                    setIsSelectingAddress(false)
                }}
            />
        </Box>
    )
}

export default AddressSelector
