import MeLayout from "@components/UI/MeUI/MeLayout"
import OrderUI from "@components/UI/MeUI/OrderUI"
import { NextPageWithLayout } from "../_app"

const Order: NextPageWithLayout = () => {
    return <OrderUI />
}

Order.getLayout = function getLayout(page) {
    return <MeLayout>{page}</MeLayout>
}

export default Order
