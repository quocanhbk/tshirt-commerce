import { collection, getDocs, getDoc, doc, query, where, orderBy } from "firebase/firestore"
import { db } from "@firebaseConfig"
import { shuffle } from "@utils"

export type ShirtColor = Record<"code" | "name" | "image", string>

export interface Shirt {
    id: string
    name: string
    price: number
    colors: ShirtColor[]
    image: string
    brand: string
    material: string
    type: string
    description: string
}
const sorter = (s1: Shirt, s2: Shirt) => {
    if (s1.id > s2.id) return 1
    else if (s1.id < s2.id) return -1
    return 0
}
export const getShirts = async () => {
    const docRef = collection(db, "shirts")
    const q = await getDocs(docRef)
    return q.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Shirt[]
}
export const getRandomShirt = async (quantity: number) => {
    const shirts = await getShirts()
    return shuffle(shirts).slice(0, 5)
}
export const getShirt = async (id: string) => {
    const ref = doc(db, "shirts", id)
    const docData = await getDoc(ref)
    return { id: docData.id, ...docData.data() } as Shirt
}

export const getShirtsByType = async (type: string) => {
    const docRef = collection(db, "shirts")
    const q = await getDocs(query(docRef, where("type", "==", type)))
    return (q.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Shirt[]).sort(sorter)
}

export const getSimilarShirts = async (shirtId: string) => {
    const shirtType = (await getShirt(shirtId)).type
    const shirts = await getShirtsByType(shirtType)
    return shirts.filter(shirt => shirt.id !== shirtId)
}
