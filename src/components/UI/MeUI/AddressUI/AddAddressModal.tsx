import { addAddress, Address } from "@api"
import { Checkbox, Button, VStack, Flex, FormLabel } from "@chakra-ui/react"
import { ChakraModal, TextFormControl } from "@components/shared"
import { useAppContext } from "@context"
import { useChakraToast, useFormCore } from "@hooks"
import { nanoid } from "nanoid"
import { useEffect } from "react"
import { useMutation, useQueryClient } from "react-query"

interface AddAddressModalProps {
    isOpen: boolean
    onClose: () => void
}

const AddAddressModal = ({ isOpen, onClose }: AddAddressModalProps) => {
    const { user, uid } = useAppContext()
    const toast = useChakraToast()
    const qc = useQueryClient()
    const { values, setValue, initForm } = useFormCore<Address & { default: boolean }>({
        id: nanoid(),
        name: "",
        address: "",
        phone: "",
        default: false,
    })
    useEffect(() => {
        initForm({
            id: nanoid(),
            name: user?.name || "",
            address: "",
            phone: user?.phone || "",
            default: false,
        })
    }, [initForm, isOpen])
    const { mutate, isLoading } = useMutation(() => addAddress(uid, values, { isDefault: values.default }), {
        onSuccess: () => {
            toast({ title: "Thêm địa chỉ thành công", status: "success" })
            qc.invalidateQueries("addresses")
            qc.invalidateQueries("default-address-id")
        },
        onError: () => {
            toast({ title: "Đã xảy ra lỗi", message: "Vui lòng thử lại sau", status: "error" })
        },
        onSettled: () => onClose(),
    })

    return (
        <ChakraModal
            title="Thêm địa chỉ"
            isOpen={isOpen}
            onClose={onClose}
            footer={
                <>
                    <Button mr={3} size="sm" onClick={() => mutate()} isLoading={isLoading}>
                        Xác nhận
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        Hủy
                    </Button>
                </>
            }
        >
            <VStack align="flex-start">
                <TextFormControl label="Tên" value={values.name} onChange={v => setValue("name", v)} />
                <TextFormControl label="Địa chỉ" value={values.address} onChange={v => setValue("address", v)} />
                <TextFormControl label="Số điện thoại" value={values.phone} onChange={v => setValue("phone", v)} />
                <Flex align="center">
                    <FormLabel mb={0}>Đặt làm mặc định</FormLabel>
                    <Checkbox isChecked={values.default} onChange={e => setValue("default", e.target.checked)} />
                </Flex>
            </VStack>
        </ChakraModal>
    )
}

export default AddAddressModal
