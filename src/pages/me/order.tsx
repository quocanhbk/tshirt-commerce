
import MeLayout from "@components/UI/MeUI/MeLayout"
import OrderUI from "@components/UI/MeUI/OrderUI"
import { NextPageWithLayout } from "../_app"
import { updateOrderStatus } from "@api"
import { useChakraToast } from "@hooks"

const Order: NextPageWithLayout = ({ status }) => {
    const toast = useChakraToast()
    if (status != null) {
        if (status == 'success') {
            toast({ status: "success", title: "Mua hàng thành công!" })
        } else {
            toast({ status: "error", title: "Mua hàng thất bại!", message: "Vui lòng thử lại sau" })
        }
    }
    
    return <OrderUI />
}

Order.getLayout = function getLayout(page) {
    return <MeLayout>{page}</MeLayout>
}

Order.getInitialProps = async ({query}) => {
    const { orderId, resultCode, message } = query
    if (resultCode == null) {
        return { status: null }
    }
    if (resultCode === '0') {
        await updateOrderStatus(orderId, 'success')
        return { status: 'success' }
    }
    await updateOrderStatus(orderId, 'failed')
    return { status: 'failed' }
}

export default Order
