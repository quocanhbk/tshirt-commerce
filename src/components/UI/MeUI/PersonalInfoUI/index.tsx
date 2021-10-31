import { getUser, updateUserInfo, UserInformation } from "@api"
import { Box, Heading, VStack, Button, Flex, useToast } from "@chakra-ui/react"
import { TextFormControl } from "@components/shared"
import { auth } from "@firebaseConfig"
import { useFormCore } from "@hooks"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"

const PersonalInfoUI = () => {
    const { values, setValue, initForm } = useFormCore<UserInformation>({
        name: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
    })
    useQuery("personal-info", () => getUser(auth.currentUser!.uid), {
        onSuccess: initForm,
    })
    const toast = useToast()
    const [isEditing, setIsEditing] = useState(false)
    const { mutate, isLoading } = useMutation<unknown, unknown, UserInformation>(
        user => updateUserInfo(auth.currentUser!.uid, user),
        {
            onSettled: () => setIsEditing(false),
            onSuccess: () => {
                toast({ status: "success", title: "Chỉnh sửa thông tin thành công!" })
            },
        }
    )
    return (
        <Box>
            <Flex justify="space-between" align="center">
                <Heading fontSize="lg" textTransform="uppercase" mb={4}>
                    Thông tin cá nhân
                </Heading>
                <Button
                    size="sm"
                    onClick={() => {
                        if (!isEditing) setIsEditing(true)
                        else mutate(values)
                    }}
                    isLoading={isLoading}
                    loadingText="Đang lưu"
                >
                    {isEditing ? "Lưu" : "Chỉnh sửa"}
                </Button>
            </Flex>
            <VStack spacing={2}>
                <TextFormControl
                    label="Tên"
                    value={values.name}
                    onChange={v => setValue("name", v)}
                    readOnly={!isEditing}
                />
                <TextFormControl
                    label="Email"
                    value={values.email}
                    onChange={v => setValue("email", v)}
                    readOnly={!isEditing}
                />
                <TextFormControl
                    label="Số điện thoại"
                    value={values.phone}
                    onChange={v => setValue("phone", v)}
                    readOnly={!isEditing}
                />
                <TextFormControl
                    label="Giới tính"
                    value={values.gender}
                    onChange={v => setValue("gender", v)}
                    readOnly={!isEditing}
                />
                <TextFormControl
                    label="Ngày sinh"
                    value={values.dateOfBirth}
                    onChange={v => setValue("dateOfBirth", v)}
                    readOnly={!isEditing}
                />
            </VStack>
        </Box>
    )
}

export default PersonalInfoUI
