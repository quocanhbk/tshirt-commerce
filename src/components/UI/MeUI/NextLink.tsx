import Link from "next/link"
import { Text } from "@chakra-ui/react"
interface NextLinkProps {
    href: string
    text: string
    active?: boolean
}

const NextLink = ({ href, text, active }: NextLinkProps) => {
    return (
        <Link href={href}>
            <Text cursor="pointer" color={active ? "blue.500" : "black"} fontWeight={active ? "semibold" : "normal"}>
                {text}
            </Text>
        </Link>
    )
}

export default NextLink
