import { Address, deleteAddress, getAddresses, getDefaultAddressId } from "@api"
import { Box, Flex, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react"
import { ConfirmDialog } from "@components/shared"
import { useAppContext } from "@context"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import AddAddressModal from "./AddAddressModal"
import AddressCard from "./AddressCard"
import UpdateAddressModal from "./UpdateAddressModal"

const AddressUI = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { uid } = useAppContext()
    const { data } = useQuery("addresses", () => getAddresses(uid), { initialData: [], enabled: !!uid })
    const { data: defaultAddressId } = useQuery("default-address-id", () => getDefaultAddressId(uid))
    const [deletingAddress, setDeletingAddress] = useState("")
    const [editingAddress, setEditingAddress] = useState<null | (Address & { default: boolean })>(null)
    const qc = useQueryClient()
    const { mutate: mutateDeleteAddress, isLoading: isDeletingAddress } = useMutation(
        () => deleteAddress(uid, deletingAddress!),
        {
            onSuccess: () => {
                qc.invalidateQueries("addresses")
                qc.invalidateQueries("default-address-id")
                setDeletingAddress("")
            },
        }
    )
    return (
        <Box>
            <Flex justify="space-between" align="center" mb={2}>
                <Heading fontSize="lg" textTransform="uppercase" mb={4}>
                    Địa chỉ giao hàng
                </Heading>
                <Button size="sm" onClick={() => setIsOpen(true)}>
                    Thêm địa chỉ
                </Button>
            </Flex>
            <SimpleGrid columns={2} spacing={4}>
                {data!.map(addressInfo => (
                    <AddressCard
                        key={addressInfo.id}
                        addressInfo={addressInfo}
                        isDefault={addressInfo.id === defaultAddressId}
                        onDeleteClick={() => setDeletingAddress(addressInfo.id)}
                        onEditClick={() =>
                            setEditingAddress({ ...addressInfo, default: addressInfo.id === defaultAddressId })
                        }
                    />
                ))}
            </SimpleGrid>
            <AddAddressModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <UpdateAddressModal data={editingAddress} onClose={() => setEditingAddress(null)} />
            <ConfirmDialog
                isOpen={!!deletingAddress}
                onClose={() => setDeletingAddress("")}
                title="Xóa địa chỉ"
                colorScheme="red"
                onConfirm={mutateDeleteAddress}
                children={<Text>Bạn có chắc chắn muốn xóa địa chỉ này?</Text>}
                isLoading={isDeletingAddress}
            />
        </Box>
    )
}

export default AddressUI
