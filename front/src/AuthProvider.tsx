import { ReactNode, createContext, useState } from 'react'

import UserService from '@Services/user'

interface AuthContextType {
    user: null | { id: string; email: string; password: string; role: string }
    login: (userToken: string, callback: VoidFunction) => void
    // signout: (callback: VoidFunction) => void
}

export const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null)

    const login = (userToken: string, callback: VoidFunction) => {
        return UserService.me(userToken).then(response => {
            setUser(response.data)
            callback()
        })
    }

    // const logout = (callback: VoidFunction) => {
    //     return UserService.logout().then(() => {
    //         setUser(null)
    //         callback()
    //     })
    // }

    const value = { user, login }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
