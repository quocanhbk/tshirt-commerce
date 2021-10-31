import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack } from "@chakra-ui/react"
import React from "react"
import { useFormCore } from "@hooks"
import LoginTag from "./LoginTag"

import { loginWithGoogle } from "@api"

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color="blue.500">Đăng nhập</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={4}>
                    <VStack justify="space-evenly">
                        <LoginTag img="/images/google.png" label="Google" onClick={() => loginWithGoogle()} />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default LoginModal
