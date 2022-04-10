import { useContext } from 'react'
import { Button } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { ADMIN_HOTELS, ADMIN_ROOMS, ADMIN_USERS } from '@Constants/routes'
import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
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
                <>
                    <Button variant="contained" component={Link} to={ADMIN_USERS}>
                        Gestion des utilisateurs
                    </Button>
                    <Button variant="contained" component={Link} to={ADMIN_HOTELS}>
                        Gestion des hôtels
                    </Button>
                </>
            )}

            {(user?.role === ROLE_ADMIN || user?.role === ROLE_MANAGER) && (
                <>
                    <Button variant="contained" component={Link} to={ADMIN_ROOMS}>
                        Gestion des suites
                    </Button>
                </>
            )}
        </>
    )
}

export default Admin
