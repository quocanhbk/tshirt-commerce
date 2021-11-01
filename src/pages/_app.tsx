import type { AppProps } from "next/app"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import { ContextProvider } from "@context"
import Header from "@components/UI/HeaderUI"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import FooterUI from "@components/UI/FooterUI"
import { ReactElement, ReactNode, useRef } from "react"
import { NextPage } from "next"
import theme from "src/theme"
import Head from "next/head"

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const queryClient = useRef(new QueryClient())
    const getLayout = Component.getLayout || (page => page)
    return (
        <QueryClientProvider client={queryClient.current}>
            <Hydrate state={pageProps.dehydratedState}>
                <ContextProvider>
                    <ChakraProvider theme={theme}>
                        <Flex direction="column" minH="100vh">
                            <Head>
                                <title>T-SHIRT</title>
                            </Head>
                            <Header />
                            <Flex w="full" direction="column" flex={1}>
                                {getLayout(<Component {...pageProps} />)}
                            </Flex>
                            <FooterUI />
                        </Flex>
                    </ChakraProvider>
                </ContextProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}
export default MyApp
