import { FormControl, FormLabel, Input, FormControlProps } from "@chakra-ui/react"
import { ComponentProps } from "react"
import FControl from "./FControl"

interface TextFormControlProps extends Omit<FormControlProps, "onChange"> {
    label: string
    value?: string
    onChange?: (newValue: string) => void
    type?: ComponentProps<typeof Input>["type"]
    readOnly?: boolean
}

export const TextFormControl = ({ label, onChange, value, type, readOnly, ...rest }: TextFormControlProps) => {
    return (
        <FControl label={label} {...rest}>
            <Input
                value={value}
                onChange={e => onChange && onChange(e.target.value)}
                type={type}
                readOnly={readOnly}
                variant={readOnly ? "filled" : "outline"}
            />
        </FControl>
    )
}

export default TextFormControl
