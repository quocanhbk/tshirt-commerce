import React, { useCallback } from "react"
import { useToast, UseToastOptions } from "@chakra-ui/react"

type UseChakraToastOptions = {
    defaultDuration: number
}

type ChakraToastOptions = {
    status?: UseToastOptions["status"]
    title: string
    message?: string
    duration?: number
}
// hehe
export const useChakraToast = ({ defaultDuration }: UseChakraToastOptions = { defaultDuration: 2500 }) => {
    const toast = useToast()

    return useCallback((options: ChakraToastOptions) => {
        const { status, title, message, duration = defaultDuration } = options
        setTimeout(
            () =>
                toast({
                    status,
                    duration,
                    title,
                    description: message,
                }),
            250
        )
    }, [])
}

export default useChakraToast
