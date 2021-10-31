import { UserCredential } from "@firebase/auth"
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "@firebase/firestore"
import { db } from "@firebaseConfig"
import { UserAddress } from "./address"
import { UserCart } from "./cart"

export interface UserInformation {
    name: string
    email: string
    dateOfBirth: string
    gender: string
    phone: string
}

export interface User extends UserInformation, UserAddress, UserCart {}

export const getUserRef = (uid: string) => doc(db, "users", uid)

export const getUser = async (uid: string): Promise<User> => {
    const ref = getUserRef(uid)
    const query = await getDoc(ref)
    return query.data() as User
}

export const updateUserInfo = async (uid: string, input: UserInformation) => {
    const userRef = getUserRef(uid)
    await setDoc(userRef, input, { merge: true })
}

export const addUser = async (user: UserCredential["user"]) => {
    const { uid, displayName, email, phoneNumber } = user

    const userDoc = await getUser(uid)
    if (!userDoc) {
        const userRef = getUserRef(uid)
        const defaultUserInfo: User = {
            email: email || "",
            phone: phoneNumber || "",
            name: displayName || "",
            dateOfBirth: "",
            gender: "",
            addresses: [],
            cart: [],
            defaultAddress: "",
        }
        await setDoc(userRef, defaultUserInfo)
    }
}
