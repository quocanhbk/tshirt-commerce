import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalProps,
} from "@chakra-ui/react"
import React, { ReactNode } from "react"

interface ChakraModalProps extends ModalProps {
    isOpen: boolean
    onClose: () => void
    title: ReactNode
    children: ReactNode
    footer?: ReactNode
}

export const ChakraModal = ({ isOpen, onClose, title, children, footer, ...rest }: ChakraModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} {...rest}>
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
