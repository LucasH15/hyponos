import Breadcrumb from '@Components/Breadcrumb'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'

import { IRoom } from '@Interfaces/room'
import RoomService from '@Services/room'
import { HOME, HOTEL, HOTELS } from '@Constants/routes'
import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'

const Room = () => {
    const { hotelId, roomId } = useParams()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [room, setRoom] = useState<null | IRoom>(null)

    useEffect(() => {
        if (roomId && hotelId) {
            RoomService.getOne(roomId)
                .then(response => setRoom(response.data))
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
                                label: room.hotelId,
                                path: HOTEL.replace(':hotelId', room.hotelId)
                            },
                            {
                                label: room.title,
                                path: ''
                            }
                        ]}
                    />

                    <Typography variant="h1">{room.title}</Typography>
                </>
            )}
        </>
    )
}

export default Room
