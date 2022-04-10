import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { HOME, LOGIN } from '@Constants/routes'
import { ALL } from '@Constants/roles'
import { TOKEN_KEY } from '@Constants/request'
import { AuthContext } from './AuthProvider'

interface IRequireAuth {
    roles?: string[]
    children: JSX.Element
}

const RequireAuth = ({ roles = ALL, children }: IRequireAuth): JSX.Element | null => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    if (!auth?.user?.id) {
        const token = localStorage.getItem(TOKEN_KEY)

        if (!token) {
            navigate(LOGIN, { replace: true })
            return null
        }

        auth.login(token, true)
            .then(user => {
                auth.user = user
            })
            .catch(() => {
                localStorage.removeItem(TOKEN_KEY)
                navigate(LOGIN, { replace: true })
                return null
            })
    }

    if (auth.user && !roles.includes(auth.user.role)) {
        // TODO create 403 page error
        navigate(HOME, { replace: true })
        return null
    }

    return children
}

export default RequireAuth
