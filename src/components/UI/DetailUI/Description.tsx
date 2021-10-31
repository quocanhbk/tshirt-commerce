import { Box, Heading, Text } from "@chakra-ui/layout"

interface DescriptionProps {
    data: string
}

const Description = ({ data }: DescriptionProps) => {
    return (
        <Box mb={8}>
            <Heading fontSize="lg">MÔ TẢ SẢN PHẨM</Heading>
            <Text>{data}</Text>
        </Box>
    )
}

export default Description
