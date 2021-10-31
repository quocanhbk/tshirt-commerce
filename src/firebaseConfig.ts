import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiwG4fn6-kYVmtW6jF7wnJShs0fhqrknc",
    authDomain: "tshirt-commerce-bb9ac.firebaseapp.com",
    projectId: "tshirt-commerce",
    storageBucket: "tshirt-commerce.appspot.com",
    messagingSenderId: "579709040500",
    appId: "1:579709040500:web:1c39506a46fb3baa3d1e21",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth()
