import { getUser, UserInformation } from "@api"
import { User } from "@firebase/auth"
import { auth } from "@firebaseConfig"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"

const AppContext = createContext<null | { user: UserInformation | undefined; loading: boolean; uid: string }>(null)

interface ContextProps {
    children: ReactNode
}

const useApp = () => {
    const [uid, setUid] = useState("")
    const [loading, setLoading] = useState(true)
    const { data: user } = useQuery("user", () => getUser(uid), {
        enabled: !!uid,
    })
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) {
                setUid("")
                setLoading(false)
                return
            }
            setLoading(true)
            setUid(user.uid)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])
    return { user, loading, uid }
}

export const ContextProvider = ({ children }: ContextProps) => {
    return <AppContext.Provider value={useApp()}>{children}</AppContext.Provider>
}

export const useAppContext = () =>
    useContext(AppContext) as { user: UserInformation | undefined; loading: boolean; uid: string }
