import { addAddress, Address, updateAddress } from "@api"
import { Checkbox, Button, VStack, Flex, FormLabel } from "@chakra-ui/react"
import { ChakraModal, TextFormControl } from "@components/shared"
import { useAppContext } from "@context"
import { useChakraToast, useFormCore } from "@hooks"
import { useEffect } from "react"
import { useMutation, useQueryClient } from "react-query"

interface AddAddressModalProps {
    data: (Address & { default: boolean }) | null
    onClose: () => void
}

const UpdateAddressModal = ({ data, onClose }: AddAddressModalProps) => {
    const { user, uid } = useAppContext()
    const toast = useChakraToast()
    const qc = useQueryClient()
    const { values, setValue, initForm } = useFormCore<Address & { default: boolean }>({
        id: "",
        name: "",
        address: "",
        phone: "",
        default: false,
    })
    useEffect(() => {
        if (data) initForm(data)
    }, [initForm, data])
    const { mutate, isLoading } = useMutation(() => updateAddress(uid, values, { isDefault: values.default }), {
        onSuccess: () => {
            toast({ title: "Chỉnh sửa địa chỉ thành công", status: "success" })
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
            title="Chỉnh sửa địa chỉ"
            isOpen={!!data}
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

export default UpdateAddressModal
