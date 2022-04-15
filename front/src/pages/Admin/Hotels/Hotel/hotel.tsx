import { Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
import { TOKEN_KEY } from '@Constants/request'
import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'
import { ADMIN_HOTELS } from '@Constants/routes'
import { HotelService, UserService } from '@Services/index'
import { IHotel } from '@Interfaces/hotel'
import { AuthContext } from '@Src/AuthProvider'

const Hotel = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const auth = useContext(AuthContext)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const { hotelId } = useParams()
    const [hotel, setHotel] = useState<null | IHotel>(null)

    useEffect(() => {
        if (hotelId) {
            if (auth.user?.role === ROLE_ADMIN) {
                HotelService.getOne(hotelId)
                    .then(hotel => {
                        setHotel(hotel.data)
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            navigate(ADMIN_HOTELS, { replace: true })
                        } else {
                            enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                        }
                    })
            } else if (auth.user?.role === ROLE_MANAGER && token) {
                UserService.me({ token, hotelId })
                    .then(response => {
                        const hotels = response.data.hotels
                        if (hotels.length === 0) {
                            navigate(ADMIN_HOTELS, { replace: true })
                        } else {
                            setHotel(hotels[0])
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        } else {
            navigate(ADMIN_HOTELS, { replace: true })
        }
    }, [hotelId])

    return (
        <>
            <Helmet>
                <title>Hôtel</title>
                <meta name="robots" content="none" />
            </Helmet>

            {hotel && (
                <>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h1">{hotel.name}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <p>Adresse: {hotel.address}</p>
                            <p>Code postal: {hotel.postCode}</p>
                            <p>Ville: {hotel.city}</p>
                            <p>Pays: {hotel.country}</p>
                        </Grid>

                        <Grid item xs={12}>
                            <p>Description: </p>
                            <p>{hotel.description}</p>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    )
}

export default Hotel
