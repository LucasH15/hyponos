import { useContext } from 'react'
import { Button } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { ROLE_ADMIN } from '@Constants/roles'
import { AuthContext } from '../../AuthProvider'

const Dashboard = () => {
    const { user } = useContext(AuthContext)

    return (
        <>
            <Helmet>
                <title>{`Dashboard ${user?.firstname ? `de ${user.firstname}` : ''}`}</title>
                <meta name="robots" content="none" />
            </Helmet>

            {user?.role === ROLE_ADMIN && (
                <Button variant="contained" component={Link} to="/dashboard/roles">
                    Gestion des utilisateurs
                </Button>
            )}
        </>
    )
}

export default Dashboard
