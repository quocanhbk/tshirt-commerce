import { Address, getAddresses } from "@api"
import { ChakraModal } from "@components/shared"
import { useAppContext } from "@context"
import { useQuery } from "react-query"
import AddressCard from "@components/UI/MeUI/AddressUI/AddressCard"
import { SimpleGrid, Button, Box } from "@chakra-ui/react"
interface SelectAddressProps {
    isOpen: boolean
    onClose: () => void
    onSelectAddress: (address: Address) => void
}

const SelectAddressModal = ({ isOpen, onClose, onSelectAddress }: SelectAddressProps) => {
    const { uid } = useAppContext()
    const { data } = useQuery("addresses", () => getAddresses(uid), { initialData: [], enabled: !!uid })

    return (
        <ChakraModal isOpen={isOpen} onClose={onClose} title="Chọn địa chỉ" size="2xl">
            <SimpleGrid columns={2} spacing={4}>
                {data!.map(addressInfo => (
                    <Box key={addressInfo.id} cursor="pointer" onClick={() => onSelectAddress(addressInfo)}>
                        <AddressCard addressInfo={addressInfo} isSelecting />
                    </Box>
                ))}
            </SimpleGrid>
        </ChakraModal>
    )
}

export default SelectAddressModal
