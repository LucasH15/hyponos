import { useEffect, useState } from 'react'
import { Button, CardMedia, Grid, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { Helmet } from 'react-helmet-async'
import Carousel from 'react-material-ui-carousel'
import { Link, useNavigate, useParams } from 'react-router-dom'

import theme from '@Src/Theme'
import UsePrice from '@Hooks/usePrice'
import Breadcrumb from '@Components/Breadcrumb'
import { IRoomWithHotel } from '@Interfaces/room'
import { RoomService } from '@Src/services'
import { BOOKING, HOME, HOTEL, HOTELS } from '@Constants/routes'
import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'

const Room = () => {
    const { hotelId, roomId } = useParams()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [room, setRoom] = useState<null | IRoomWithHotel>(null)

    useEffect(() => {
        if (roomId && hotelId) {
            RoomService.getOne({ roomId, withHotel: true })
                .then(response => {
                    setRoom(response.data)
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        navigate(HOTELS, { replace: true })
                    } else {
                        enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                    }
                })
        } else {
            navigate(HOTEL, { replace: true, state: { hotelId } })
        }
    }, [roomId])

    return (
        <>
            <Helmet>
                <title>{`Suite - Hyponos`}</title>
            </Helmet>

            {room && (
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
                                label: room.hotel.name,
                                path: HOTEL.replace(':hotelId', room.hotelId)
                            },
                            {
                                label: room.title,
                                path: ''
                            }
                        ]}
                    />

                    {room.pictures && (
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
                                {room.pictures.map((picture, index) => (
                                    <Grid key={`pictures-${index}`}>
                                        <CardMedia
                                            component="img"
                                            height="500"
                                            image={`${process.env.REACT_APP_BASE_URL}/files/${picture}`}
                                            alt={`Suite ${room.title}`}
                                        />
                                    </Grid>
                                ))}
                            </Carousel>
                        </Grid>
                    )}

                    <Typography variant="h1" textAlign="center" sx={{ mb: 0 }}>
                        {room.title}
                    </Typography>

                    <Typography variant="h6" component="p" textAlign="center" sx={{ mb: 5 }}>
                        <UsePrice price={room.price} /> / nuit
                    </Typography>

                    {room.description && (
                        <Grid sx={{ textAlign: 'center' }}>
                            <Typography component="p" width={{ xs: '100%', lg: '60%' }} sx={{ mx: 'auto' }}>
                                {room.description}
                            </Typography>
                        </Grid>
                    )}

                    <Grid sx={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to={{
                                pathname: BOOKING,
                                search: `?hotelId=${hotelId}&roomId=${roomId}`
                            }}
                            sx={{ mt: 10 }}
                        >
                            Faire une réservation
                        </Button>
                    </Grid>
                </>
            )}
        </>
    )
}

export default Room
