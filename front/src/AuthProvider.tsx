import { ReactNode, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IUser } from '@Interfaces/user'
import { TOKEN_KEY } from '@Constants/request'
import { HOME, LOGIN } from '@Constants/routes'
import UserService from '@Services/user'

interface IAuthContextType {
    user: null | IUser
    login: <B extends boolean>(userToken: string, returnUser?: B) => Promise<B extends true ? IUser : void>
    logout: () => void
}

export const AuthContext = createContext<IAuthContextType>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<null | IUser>(null)

    const login = (userToken: string, returnUser = false) => {
        return UserService.me({ token: userToken })
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

    const logout = () => {
        setUser(null)
        localStorage.removeItem(TOKEN_KEY)
        navigate(HOME, { replace: true })
    }

    const value = { user, login, logout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
