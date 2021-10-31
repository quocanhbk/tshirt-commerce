import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react"
import React, { ReactNode } from "react"

interface ChakraModalProps {
    isOpen: boolean
    onClose: () => void
    title: ReactNode
    children: ReactNode
    footer: ReactNode
}

export const ChakraModal = ({ isOpen, onClose, title, children, footer }: ChakraModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                <ModalFooter>{footer}</ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ChakraModal
