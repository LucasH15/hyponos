import { HOME, LOGIN } from '@Constants/routes'
import { ReactNode, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TOKEN_KEY } from '@Constants/request'
import UserService from '@Services/user'

export interface IUser {
    id: string
    email: string
    password: string
    role: string
    firstname?: string
    lastname?: string
}

interface IAuthContextType {
    user: null | IUser
    login: <B extends boolean>(userToken: string, returnUser?: B) => Promise<B extends true ? IUser : void>
    // signout: (callback: VoidFunction) => void
}

export const AuthContext = createContext<IAuthContextType>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<null | IUser>(null)

    const login = (userToken: string, returnUser = false) => {
        return UserService.me(userToken)
            .then(response => {
                setUser(response.data)

                if (returnUser) {
                    return response.data
                }
            })
            .catch(error => {
                if (error?.response?.status === 401) {
                    localStorage.removeItem(TOKEN_KEY)
                    navigate(LOGIN, { replace: true })
                }

                navigate(HOME, { replace: true })
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
