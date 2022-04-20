import { HOTEL } from '@Constants/routes'
import { Card, CardContent, CardMedia, Grid, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { IHotel } from '@Interfaces/hotel'
import HotelService from '@Services/hotel'

const Hotels = () => {
    const [hotels, setHotels] = useState<null | IHotel[]>(null)

    useEffect(() => {
        HotelService.get({})
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

            <Grid container spacing={10} justifyContent="center">
                {!hotels
                    ? [...new Array(6)].map(index => (
                          <Grid item xs={12} lg={6} key={index}>
                              <Card variant="outlined" sx={{ display: 'block' }}>
                                  <Skeleton height={200} component={CardMedia} sx={{ transform: 'none' }} />
                                  <CardContent>
                                      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                                          <Skeleton />
                                      </Typography>
                                      <Typography component="p">
                                          <Skeleton />
                                      </Typography>
                                      <Typography component="p">
                                          <Skeleton />
                                      </Typography>
                                      <Typography component="p">
                                          <Skeleton />
                                      </Typography>
                                  </CardContent>
                              </Card>
                          </Grid>
                      ))
                    : hotels.map(hotel => (
                          <Grid item xs={12} lg={6} key={hotel.id}>
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
                                                  WebkitLineClamp: '3',
                                                  WebkitBoxOrient: 'vertical',
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
        </>
    )
}

export default Hotels
