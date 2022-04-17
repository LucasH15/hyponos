import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useParams } from 'react-router-dom'

import UsePrice from '@Hooks/usePrice'
import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'
import { HOME, HOTELS, HOTEL_ROOM } from '@Constants/routes'
import { IHotelAndRooms } from '@Interfaces/hotel'
import HotelService from '@Services/hotel'

const Hotel = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { hotelId } = useParams()
    const [hotel, setHotel] = useState<null | IHotelAndRooms>(null)

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
                <title>{`Hôtel${hotel && ` ${hotel.name}`}`}</title>
            </Helmet>

            {hotel && (
                <>
                    <Typography variant="h1">{hotel.name}</Typography>
                    <p>Adresse: {hotel.address}</p>
                    <p>Code postal: {hotel.postCode}</p>
                    <p>Ville: {hotel.city}</p>
                    <p>Pays: {hotel.country}</p>
                    {hotel.description && <p>{hotel.description}</p>}

                    {hotel.rooms && (
                        <>
                            <Typography variant="h2">Nos suites</Typography>

                            <Grid container>
                                {hotel.rooms.map(room => (
                                    <Grid item xs={12} md={6} lg={4} key={room.id}>
                                        <Card
                                            variant="outlined"
                                            component={Link}
                                            to={HOTEL_ROOM.replace(':hotelId', hotelId as string).replace(
                                                ':roomId',
                                                room.id
                                            )}
                                            sx={{ display: 'block' }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={`${process.env.REACT_APP_FILES_URL}/${room.mainPicture}`}
                                                alt={`Image principale de la suite ${room.title}`}
                                            />
                                            <CardContent>
                                                <Typography variant="h5" component="h3">
                                                    {room.title}
                                                </Typography>
                                                <Typography variant="subtitle1" component="p">
                                                    <UsePrice price={room.price} />
                                                    /nuit
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Hotel
