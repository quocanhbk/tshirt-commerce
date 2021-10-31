import { FormControlProps, FormControl, FormLabel } from "@chakra-ui/form-control"
import React, { ReactNode } from "react"

interface FControlProps extends Omit<FormControlProps, "label" | "children"> {
    label: ReactNode
    children: ReactNode
}

export const FControl = ({ label, children, ...rest }: FControlProps) => {
    return (
        <FormControl {...rest}>
            <FormLabel mb={1}>{label}</FormLabel>
            {children}
        </FormControl>
    )
}

export default FControl
