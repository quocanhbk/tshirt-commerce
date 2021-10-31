import { Text, TextProps } from "@chakra-ui/layout"
import { numberToPrice } from "@utils"

interface PriceProps extends TextProps {
    value: number
}

export const Price = ({ value, ...rest }: PriceProps) => {
    return (
        <Text color="red.500" fontWeight="bold" {...rest}>
            {numberToPrice(value)}
        </Text>
    )
}

export default Price
