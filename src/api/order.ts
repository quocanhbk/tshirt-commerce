import { Address, CartItem, emptyCart } from "@api"
import { doc, setDoc } from "@firebase/firestore"
import { db } from "@firebaseConfig"

export type PaymentType = "cash" | "momo"
export type OrderStatus = "pending" | "success" | "failed"
export interface Order {
    buyerId: string
    cart: CartItem[]
    addressInfo: Pick<Address, "name" | "address" | "phone">
    paymentType: PaymentType
    totalPrice: number
    status: OrderStatus
}

export const getOrderRef = (orderId: string) => doc(db, "orders", orderId)

export const createOrder = async (orderId: string, orderInfo: Omit<Order, "status">) => {
    const orderRef = getOrderRef(orderId)
    const order: Order = {
        ...orderInfo,
        status: "pending",
    }
    await setDoc(orderRef, order)
    await emptyCart(orderInfo.buyerId)
}
