import { getShirts, getUser, getUserRef, Shirt, ShirtColor } from "@api"
import { ShirtSize } from "@components/UI/DetailUI/SizeSelection"
import { arrayUnion, updateDoc } from "@firebase/firestore"

export interface CartItem {
    id: string
    shirtId: string
    color: ShirtColor
    size: ShirtSize
    quantity: number
}

export interface UserCart {
    cart: CartItem[]
}

export const getCart = async (uid: string) => {
    const user = await getUser(uid)
    return user.cart
}

export interface CartItemWithShirt extends CartItem, Omit<Shirt, "id"> {}

export const getCartWithImage = async (uid: string): Promise<CartItemWithShirt[]> => {
    const cart = await getCart(uid)
    const shirts = await getShirts()
    return cart.map(cartItem => ({
        ...shirts.find(shirt => shirt.id === cartItem.shirtId)!,
        ...cartItem,
    }))
}

export const addToCart = async (uid: string, input: CartItem) => {
    const userRef = getUserRef(uid)
    const cart = await getCart(uid)

    // Check if there is a shirt with same color and size in the cart
    // If YES, update the quantity
    // Else, push that shirt to the array
    let target = cart.find(
        item => item.shirtId === input.shirtId && item.color.code === input.color.code && item.size === input.size
    )
    if (target) {
        target.quantity += input.quantity
        await updateDoc(userRef, {
            cart,
        })
    } else {
        await updateDoc(userRef, {
            cart: arrayUnion(input),
        })
    }
}

export const removeFromCart = async (uid: string, cartId: string) => {
    const userRef = getUserRef(uid)
    const cart = await getCart(uid)
    await updateDoc(userRef, {
        cart: cart.filter(cartItem => cartItem.id !== cartId),
    })
}

export const changeShirtQuantity = async (
    uid: string,
    { cartItemId, quantity }: { cartItemId: string; quantity: number }
) => {
    const userRef = getUserRef(uid)
    const cart = await getCart(uid)
    const target = cart.find(cartItem => cartItem.id === cartItemId)
    if (target) {
        target.quantity = quantity
        updateDoc(userRef, {
            cart,
        })
    }
}

export const emptyCart = async (uid: string) => {
    const userRef = getUserRef(uid)
    await updateDoc(userRef, {
        cart: [],
    })
}
