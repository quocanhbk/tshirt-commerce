import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack } from "@chakra-ui/react"
import React from "react"
import { useFormCore } from "@hooks"
import LoginTag from "./LoginTag"

import { loginWithGoogle } from "@api"
import { useMutation } from "react-query"

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const { mutate } = useMutation(loginWithGoogle, {
        onSuccess: () => onClose(),
    })
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color="blue.500">Đăng nhập</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={4}>
                    <VStack justify="space-evenly">
                        <LoginTag img="/images/google.png" label="Google" onClick={() => mutate()} />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default LoginModal
