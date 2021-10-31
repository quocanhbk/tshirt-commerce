import { addUser } from "@api"
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth"
import { auth } from "@firebaseConfig"

const googleProvider = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
    try {
        let userCredentials = await signInWithPopup(auth, googleProvider)
        addUser(userCredentials.user)
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    await auth.signOut()
}
