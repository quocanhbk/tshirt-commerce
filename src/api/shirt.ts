import { collection, getDocs, getDoc, doc, query, where, limit } from "firebase/firestore"
import { db } from "@firebaseConfig"

export interface Shirt {
    id: string
    name: string
    price: number
    colors: Record<"code" | "name" | "image", string>[]
    image: string
    brand: string
    material: string
    type: string
    description: string
}

export const getShirts = async () => {
    const docRef = collection(db, "shirts")
    const query = await getDocs(docRef)
    return query.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Shirt[]
}

export const getShirt = async (id: string) => {
    const ref = doc(db, "shirts", id)
    const docData = await getDoc(ref)
    return { id: docData.id, ...docData.data() } as Shirt
}

export const getShirtsByType = async (type: string) => {
    const docRef = collection(db, "shirts")
    const q = await getDocs(query(docRef, where("type", "==", type)))
    return q.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Shirt[]
}

export const getSimilarShirts = async (shirtId: string) => {
    const shirtType = (await getShirt(shirtId)).type
    const shirts = await getShirtsByType(shirtType)
    return shirts.filter(shirt => shirt.id !== shirtId)
}
