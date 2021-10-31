import { getShirts } from "@api"
import HomeUI from "@components/UI/HomeUI"
import type { GetStaticProps } from "next"
import { dehydrate, QueryClient } from "react-query"

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery("shirts", getShirts)
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

const Home = () => {
    return <HomeUI />
}

export default Home
