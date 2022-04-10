import { useContext } from 'react'
import { Button } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { ADMIN_USERS } from '@Constants/routes'
import { ROLE_ADMIN } from '@Constants/roles'
import { AuthContext } from '../../AuthProvider'

const Admin = () => {
    const { user } = useContext(AuthContext)

    return (
        <>
            <Helmet>
                <title>Admin</title>
                <meta name="robots" content="none" />
            </Helmet>

            {user?.role === ROLE_ADMIN && (
                <Button variant="contained" component={Link} to={ADMIN_USERS}>
                    Gestion des utilisateurs
                </Button>
            )}
        </>
    )
}

export default Admin
