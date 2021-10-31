import { getShirt, getShirts, getSimilarShirts } from "@api"
import DetailUI from "@components/UI/DetailUI"
import { GetStaticProps } from "next"
import { useRouter } from "next/dist/client/router"
import { dehydrate, QueryClient } from "react-query"

export const getStaticProps: GetStaticProps = async context => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(["shirt", context.params?.id], () => getShirt(context.params!.id as string))
    await queryClient.prefetchQuery(["shirt", "type", context.params?.id], () =>
        getSimilarShirts(context.params!.id as string)
    )
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export const getStaticPaths = async () => {
    const shirts = await getShirts()
    const paths = shirts.map(shirt => ({ params: { id: shirt.id } }))
    return {
        paths,
        fallback: false,
    }
}

const ShirtDetail = () => {
    const router = useRouter()
    return <DetailUI id={router.query.id as string | undefined} />
}

export default ShirtDetail
