import { getUser, getUserRef } from "@api"
import { arrayRemove, arrayUnion, updateDoc } from "@firebase/firestore"

export interface Address {
    id: string
    name: string
    address: string
    phone: string
}

export interface UserAddress {
    addresses: Address[]
    defaultAddress: string
}

export const getAddresses = async (uid: string) => {
    const user = await getUser(uid)
    return user.addresses
}

export const getAddress = async (uid: string, addressId: string) => {
    const addresses = await getAddresses(uid)
    return addresses.find(address => address.id === addressId)
}

export const addAddress = async (
    uid: string,
    address: Address,
    { isDefault }: { isDefault: boolean } = { isDefault: false }
) => {
    const userRef = getUserRef(uid)
    await updateDoc(userRef, {
        addresses: arrayUnion(address),
    })
    if (isDefault) {
        await setDefaultAddress(uid, address.id)
    }
}

export const setDefaultAddress = async (uid: string, addressId: string) => {
    const userRef = getUserRef(uid)
    await updateDoc(userRef, {
        defaultAddress: addressId,
    })
}

export const getDefaultAddressId = async (uid: string) => {
    const user = await getUser(uid)
    return user.defaultAddress
}

export const getDefaultAddress = async (uid: string) => {
    const user = await getUser(uid)
    const defaultAddress = user.addresses.find(address => address.id === user.defaultAddress)
    return defaultAddress ? defaultAddress : user.addresses[0] ? user.addresses[0] : undefined
}

export const deleteAddress = async (uid: string, addressId: string) => {
    const userRef = getUserRef(uid)
    const defaultAddressId = await getDefaultAddressId(uid)
    const address = await getAddress(uid, addressId)
    if (!address) return
    await updateDoc(userRef, {
        addresses: arrayRemove(address),
    })
    if (defaultAddressId === address.id) {
        updateDoc(userRef, {
            defaultAddress: "",
        })
    }
}

export const updateAddress = async (
    uid: string,
    newAddress: Address,
    { isDefault }: { isDefault: boolean } = { isDefault: false }
) => {
    await deleteAddress(uid, newAddress.id)
    await addAddress(uid, newAddress, { isDefault })
}
