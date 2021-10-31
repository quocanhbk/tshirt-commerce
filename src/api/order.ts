import { Address, CartItem } from "@api"
import { doc, setDoc } from "@firebase/firestore"
import { db } from "@firebaseConfig"

export type PaymentType = "cash" | "momo"
export type OrderStatus = "pending" | "success" | "failed"
export interface Order {
    buyerId: string
    cart: CartItem[]
    address: Address
    paymentType: PaymentType
    totalPrice: number
    status: OrderStatus
}

export const getOrderRef = (orderId: string) => doc(db, "orders", orderId)

export const createOrder = async (orderId: string, orderInfo: Order) => {
    const orderRef = getOrderRef(orderId)
    await setDoc(orderRef, orderInfo)
}
