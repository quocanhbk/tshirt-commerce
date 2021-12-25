import { Address, CartItem, CartItemWithShirt, emptyCart, getShirts } from "@api"
import { collection, doc, getDocs, query, setDoc, where, updateDoc } from "@firebase/firestore"
import { db } from "@firebaseConfig"
import { createHmac } from "crypto"

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

    if (order.paymentType === "momo") {
        const nextUrl = await payUsingMomo({id: orderId, ...order})
        return nextUrl
    }

    return null
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

export const payUsingMomo = async (order: Order) => {
    const partnerCode = "MOMO";
    const accessKey = "F8BBA842ECF85";
    const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const requestId = partnerCode + new Date().getTime();
    const orderId = order.id;
    const orderInfo = "Pay with Momo";
    const redirectUrl = "http://localhost:3000/me/order";
    const ipnUrl = "http://localhost:3000/me/order";
    const amount = order.totalPrice.toString();
    const requestType = "captureWallet"
    const extraData = "";

    const rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
    const signature = createHmac('sha256', secretkey).update(rawSignature).digest('hex');
    
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        accessKey : accessKey,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        extraData : extraData,
        requestType : requestType,
        signature : signature,
        lang: 'en'
    });

    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    
    //Send the request and get the response
    const result = await new Promise((resolve, reject) => {
        const https = require('https');
        const req = https.request(options, res => {
            res.setEncoding('utf8');
            res.on('data', (body) => {
                resolve(JSON.parse(body).payUrl);
            });
        });
        req.on('error', (e) => {
            reject(e.message);
        });
        req.write(requestBody);
        req.end();
    });
    return result;
}

export const updateOrderStatus = async (orderId, status) => {
    const orderRef = getOrderRef(orderId)
    await updateDoc(orderRef, { status: status })
    return null
}