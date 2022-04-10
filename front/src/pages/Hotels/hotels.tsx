import { HOTEL } from '@Constants/routes'
import { Card, Typography } from '@mui/material'
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
                <title>Hôtels</title>
            </Helmet>
            <Typography variant="h1">Hôtels</Typography>

            {hotels &&
                hotels.map(hotel => (
                    <Card variant="outlined" key={hotel.id} component={Link} to={HOTEL.replace(':hotelId', hotel.id)}>
                        <Typography variant="h4" component="h2">
                            {hotel.name}
                        </Typography>
                        {hotel.description && <p>{hotel.description}</p>}
                    </Card>
                ))}
        </>
    )
}

export default Hotels
