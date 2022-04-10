import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { HOME, LOGIN } from '@Constants/routes'
import { ALL } from '@Constants/roles'
import { TOKEN_KEY } from '@Constants/request'
import { AuthContext } from './AuthProvider'

interface IRequireAuth {
    roles?: string[]
    children: JSX.Element
}

const RequireAuth = ({ roles = ALL, children }: IRequireAuth) => {
    const auth = useContext(AuthContext)
    const token = localStorage.getItem(TOKEN_KEY)
    console.log(auth)
    if (!auth?.user?.id) {
        if (!token) {
            return <Navigate to={LOGIN} replace />
        }

        auth.login(token, true).then(user => {
            auth.user = user
        })
    }

    if (auth.user && !roles.includes(auth.user.role)) {
        // TODO create 403 page error
        return <Navigate to={HOME} replace />
    }

    return children
}

export default RequireAuth
