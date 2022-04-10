import { Card, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'

import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'
import { HOME, HOTELS } from '@Constants/routes'
import { IHotel } from '@Interfaces/hotel'
import HotelService from '@Services/hotel'

const Hotel = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { hotelId } = useParams()
    const [hotel, setHotel] = useState<null | IHotel>(null)

    useEffect(() => {
        if (hotelId) {
            HotelService.getOne(hotelId)
                .then(response => setHotel(response.data))
                .catch(error => {
                    if (error.response.status === 404) {
                        navigate(HOTELS, { replace: true })
                    } else {
                        enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                    }
                })
        } else {
            navigate(HOME, { replace: true })
        }
    }, [hotelId])

    return (
        <>
            <Helmet>
                <title>Hôtel</title>
            </Helmet>

            {hotel && (
                <>
                    <Typography variant="h1">{hotel.name}</Typography>
                    <p>Adresse: {hotel.address}</p>
                    <p>Code postal: {hotel.postCode}</p>
                    <p>Ville: {hotel.city}</p>
                    <p>Pays: {hotel.country}</p>
                    {hotel.description && <p>{hotel.description}</p>}
                </>
            )}
        </>
    )
}

export default Hotel
