import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { ALL } from '@Constants/roles'
import { AuthContext } from './AuthProvider'

interface IRequireAuth {
    roles?: string[]
    children: JSX.Element
}

const RequireAuth = ({ roles = ALL, children }: IRequireAuth) => {
    const auth = useContext(AuthContext)

    if (!auth?.user?.id) {
        return <Navigate to="/connexion" replace />
    }

    if (!roles.includes(auth.user.role)) {
        // TODO create 403 page error
        return <Navigate to="/" replace />
    }

    return children
}

export default RequireAuth
