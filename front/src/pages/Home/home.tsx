import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { CONTACT, HOTEL, HOTELS } from '@Constants/routes'
import { HotelService } from '@Src/services'
import { IHotel } from '@Interfaces/hotel'

const Home = () => {
    const [topHotels, setTopHotels] = useState<[] | IHotel[]>()

    useEffect(() => {
        HotelService.get({ limit: 3 }).then(response => {
            setTopHotels(response.data)
        })
    }, [])

    return (
        <>
            <Helmet>
                <title>Accueil - Hyponos</title>
            </Helmet>

            <Typography variant="title" component="h1" textAlign="center" sx={{ my: 5 }}>
                Bienvenue chez Hyponos
            </Typography>

            {topHotels && (
                <>
                    <Typography variant="h2" textAlign="center" sx={{ mb: 4 }}>
                        Découvrez nos superbes hôtels
                    </Typography>

                    <Grid container spacing={8}>
                        {topHotels.map(hotel => (
                            <Grid item key={hotel.id} xs={12} lg={4}>
                                <Card
                                    variant="outlined"
                                    component={Link}
                                    to={HOTEL.replace(':hotelId', hotel.id)}
                                    sx={{ display: 'block' }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`${process.env.REACT_APP_BASE_URL}/files/${hotel.mainPicture}`}
                                        alt={`Hôtel ${hotel.name}`}
                                    />
                                    <CardContent>
                                        <Typography variant="h4" component="h3" sx={{ mb: 4 }}>
                                            {hotel.name}
                                        </Typography>
                                        {hotel.description && (
                                            <Typography
                                                component="p"
                                                sx={{
                                                    display: '-webkit-box',
                                                    '-webkit-line-clamp': '3',
                                                    '-webkit-box-orient': 'vertical',
                                                    overflow: 'hidden',
                                                    hyphens: 'auto'
                                                }}
                                            >
                                                {hotel.description}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid sx={{ mt: 4, textAlign: 'center' }}>
                        <Button variant="contained" component={Link} to={HOTELS}>
                            Voir plus d&apos;hôtels
                        </Button>
                    </Grid>
                </>
            )}

            <Typography variant="h2" textAlign="center" sx={{ mt: 15, mb: 4 }}>
                Besoin de plus d&apos;informations&nbsp;?
            </Typography>

            <Grid sx={{ textAlign: 'center' }}>
                <Typography component="p" width={{ xs: '100%', lg: '50%' }} sx={{ mx: 'auto' }}>
                    Nunc fringilla erat velit, eu vehicula libero imperdiet sed. Aenean varius ornare leo, eget posuere
                    nulla interdum sit amet. Vestibulum quis imperdiet urna, quis varius arcu. Phasellus egestas finibus
                    libero, vel placerat nisl aliquet eu. Quisque auctor sagittis consequat. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis egestas.
                </Typography>
            </Grid>

            <Grid sx={{ textAlign: 'center', mt: 4 }}>
                <Button variant="contained" component={Link} to={CONTACT}>
                    Contactez-nous
                </Button>
            </Grid>
        </>
    )
}

export default Home
