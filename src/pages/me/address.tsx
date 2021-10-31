import AddressUI from "@components/UI/MeUI/AddressUI"
import MeLayout from "@components/UI/MeUI/MeLayout"
import { NextPageWithLayout } from "../_app"

const Address: NextPageWithLayout = () => {
    return <AddressUI />
}

Address.getLayout = function getLayout(page) {
    return <MeLayout>{page}</MeLayout>
}

export default Address
