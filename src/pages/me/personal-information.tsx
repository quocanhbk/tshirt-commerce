import MeLayout from "@components/UI/MeUI/MeLayout"
import PersonalInfoUI from "@components/UI/MeUI/PersonalInfoUI"
import { NextPageWithLayout } from "../_app"

const PersonalInformation: NextPageWithLayout = () => {
    return <PersonalInfoUI />
}

PersonalInformation.getLayout = function getLayout(page) {
    return <MeLayout>{page}</MeLayout>
}

export default PersonalInformation
