import { HOTEL } from '@Constants/routes'
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { IHotel } from '@Interfaces/hotel'
import HotelService from '@Services/hotel'

const Hotels = () => {
    const [hotels, setHotels] = useState<null | IHotel[]>(null)

    useEffect(() => {
        HotelService.getAll()
            .then(response => setHotels(response.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <Helmet>
                <title>Nos hôtels - Hyponos</title>
            </Helmet>

            <Typography variant="h1" textAlign="center">
                Nos hôtels
            </Typography>

            {hotels && (
                <Grid container spacing={6}>
                    {hotels.map(hotel => (
                        <Grid item xs={12} lg={6} key={hotel.id}>
                            <Card
                                variant="outlined"
                                component={Link}
                                to={HOTEL.replace(':hotelId', hotel.id)}
                                sx={{ display: 'block' }}
                            >
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={`${process.env.REACT_APP_FILES_URL}/${hotel.mainPicture}`}
                                    alt={`Image principale de l'hôtel ${hotel.name}`}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
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
            )}
        </>
    )
}

export default Hotels
