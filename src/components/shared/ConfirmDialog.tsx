import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    ButtonProps,
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import React, { ReactNode, useRef } from "react"

interface ConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
    onConfirm: () => void
    confirmText?: string
    colorScheme?: ButtonProps["colorScheme"]
    cancelText?: string
    isLoading?: boolean
}

export const ConfirmDialog = ({
    isOpen,
    onClose,
    title,
    children,
    confirmText = "Xác nhận",
    cancelText = "Hủy",
    colorScheme = "blue",
    onConfirm,
    isLoading,
}: ConfirmDialogProps) => {
    const cancelRef = useRef<HTMLButtonElement>(null)
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="semibold">
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>{children}</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button size="sm" onClick={onConfirm} mr={3} colorScheme={colorScheme} isLoading={isLoading}>
                            {confirmText}
                        </Button>
                        <Button size="sm" variant="ghost" ref={cancelRef} onClick={onClose} colorScheme={colorScheme}>
                            {cancelText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ConfirmDialog
