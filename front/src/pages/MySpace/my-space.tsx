import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'

import { IUser } from '@Interfaces/user'
import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'
import { TOKEN_KEY } from '@Constants/request'
import { UserService } from '@Src/services'

const MySpace = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const [user, setUser] = useState<null | IUser>(null)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (token) {
            UserService.me({ token, withBookings: true })
                .then(response => {
                    setUser(response.data)
                })
                .catch(() => {
                    enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                })
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>Mon espace</title>
                <meta name="robots" content="none" />
            </Helmet>

            <Typography variant="h1" align="center">
                Mon espace
            </Typography>

            {user && (
                <>
                    <p>user</p>
                    <p>info</p>
                </>
            )}
        </>
    )
}

export default MySpace
