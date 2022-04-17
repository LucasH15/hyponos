import Breadcrumb from '@Components/Breadcrumb'
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'

import UsePrice from '@Hooks/usePrice'
import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'
import { HOME, HOTELS, HOTEL_ROOM } from '@Constants/routes'
import { IHotelAndRooms } from '@Interfaces/hotel'
import HotelService from '@Services/hotel'
import theme from '@Src/Theme'

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
                <title>{`Hôtel${hotel && ` ${hotel.name}`} - Hyponos`}</title>
            </Helmet>

            {hotel && (
                <>
                    <Breadcrumb
                        routes={[
                            {
                                label: 'Accueil',
                                path: HOME
                            },
                            {
                                label: 'Hôtels',
                                path: HOTELS
                            },
                            {
                                label: hotel.name,
                                path: ''
                            }
                        ]}
                    />

                    {hotel.pictures && (
                        <Grid sx={{ mx: 'auto', mb: 5 }}>
                            <Carousel
                                navButtonsAlwaysVisible
                                height={500}
                                interval={7000}
                                duration={800}
                                activeIndicatorIconButtonProps={{
                                    style: {
                                        color: theme.palette.primary.main,
                                        opacity: 1
                                    }
                                }}
                                indicatorIconButtonProps={{
                                    style: {
                                        color: theme.palette.primary.main,
                                        opacity: 0.5
                                    }
                                }}
                                navButtonsProps={{
                                    style: {
                                        backgroundColor: theme.palette.primary.main
                                    }
                                }}
                            >
                                {hotel.pictures.map((picture, index) => (
                                    <Grid key={`pictures-${index}`}>
                                        <CardMedia
                                            component="img"
                                            height="500"
                                            image={`${process.env.REACT_APP_BASE_URL}/files/${picture}`}
                                            alt={`Hôtel ${hotel.name}`}
                                        />
                                    </Grid>
                                ))}
                            </Carousel>
                        </Grid>
                    )}

                    <Typography variant="h1" textAlign="center">
                        {hotel.name}
                    </Typography>

                    {hotel.description && (
                        <Grid sx={{ textAlign: 'center' }}>
                            <Typography component="p" width={{ xs: '100%', lg: '60%' }} sx={{ mx: 'auto' }}>
                                {hotel.description}
                            </Typography>
                        </Grid>
                    )}

                    {hotel.rooms && (
                        <>
                            <Typography variant="h2" sx={{ mt: 10, mb: 4, textAlign: 'center' }}>
                                Nos suites
                            </Typography>

                            <Grid container spacing={6} justifyContent="center">
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
                                                image={`${process.env.REACT_APP_BASE_URL}/files/${room.mainPicture}`}
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

                    <Typography variant="h2" sx={{ mt: 10, mb: 4, textAlign: 'center' }}>
                        Informations
                    </Typography>

                    <p>
                        Adresse: {hotel.address}
                        {hotel.postCode && `, ${hotel.postCode}`}, {hotel.city}, {hotel.country}
                    </p>
                </>
            )}
        </>
    )
}

export default Hotel
