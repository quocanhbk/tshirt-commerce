import { addUser } from "@api"
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth"
import { auth } from "@firebaseConfig"

const googleProvider = new GoogleAuthProvider()

export const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
        .then(res => {
            addUser(res.user)
        })
        .catch(console.log)
}
