import { Address, CartItem, CartItemWithShirt, emptyCart, getShirts } from "@api"
import { collection, doc, getDocs, query, setDoc, where } from "@firebase/firestore"
import { db } from "@firebaseConfig"

export type PaymentType = "cash" | "momo"
export type OrderStatus = "pending" | "success" | "failed"
export interface Order {
    id: string
    buyerId: string
    cart: CartItem[]
    addressInfo: Pick<Address, "name" | "address" | "phone">
    paymentType: PaymentType
    totalPrice: number
    status: OrderStatus
    createdDate: string
}

export interface OrderWithImage extends Omit<Order, "cart"> {
    cart: CartItemWithShirt[]
}

export const getOrderRef = (orderId: string) => doc(db, "orders", orderId)

export const createOrder = async (orderId: string, orderInfo: Omit<Order, "id" | "status">) => {
    const orderRef = getOrderRef(orderId)
    const order: Omit<Order, "id"> = {
        ...orderInfo,
        status: "pending",
    }
    await setDoc(orderRef, order)
    await emptyCart(orderInfo.buyerId)
}

export const getOrders = async (uid: string) => {
    const ordersCollection = collection(db, "orders")
    const q = query(ordersCollection, where("buyerId", "==", uid))
    const result = await getDocs(q)
    return result.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[]
}

export const getOrdersWithImage = async (uid: string): Promise<OrderWithImage[]> => {
    const orders = await getOrders(uid)
    const shirts = await getShirts()
    return orders.map(order => ({
        ...order,
        cart: order.cart.map(cartItem => ({
            ...shirts.find(shirt => shirt.id === cartItem.shirtId)!,
            ...cartItem,
        })),
    }))
}
