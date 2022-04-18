import { format } from 'date-fns'
import { useSnackbar } from 'notistack'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Grid, Link as MuiLink, Tab, Tabs, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { IUser } from '@Interfaces/user'
import { DATE_FRENCH_FORMAT } from '@Constants/utils'
import { HOTELS } from '@Constants/routes'
import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'
import { TOKEN_KEY } from '@Constants/request'
import { UserService } from '@Src/services'

const MySpace = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const [value, setValue] = useState<number>(0)
    const [user, setUser] = useState<null | IUser>(null)
    const { enqueueSnackbar } = useSnackbar()

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

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
                <Grid sx={{ width: '100%' }}>
                    <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Mes réservations" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                        </Tabs>
                    </Grid>
                    <div role="tabpanel" hidden={value !== 0} id="simple-tabpanel-0" aria-labelledby="simple-tab-0">
                        {value === 0 && (
                            <Grid sx={{ p: 3 }}>
                                {user.bookings ? (
                                    user.bookings.map(booking => (
                                        <Typography key={booking.id}>
                                            Du {format(new Date(booking.from), DATE_FRENCH_FORMAT)} au{' '}
                                            {format(new Date(booking.to), DATE_FRENCH_FORMAT)} à l&apos;hôtel{' '}
                                            {booking.room.hotel.name}
                                        </Typography>
                                    ))
                                ) : (
                                    <>
                                        <Typography>
                                            Pas encore de réservations&nbsp;?{' '}
                                            <MuiLink underline="hover" component={Link} to={HOTELS}>
                                                Découvrez nos hôtels
                                            </MuiLink>
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                        )}
                    </div>
                </Grid>
            )}
        </>
    )
}

export default MySpace
