import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'
import { useSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Add, Edit } from '@mui/icons-material'
import { Button, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Helmet } from 'react-helmet-async'

import { TOKEN_KEY } from '@Constants/request'
import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
import { ADMIN_HOTEL, ADMIN_ROOMS_ADD, ADMIN_ROOMS_EDIT, HOME } from '@Constants/routes'
import RoomService from '@Services/room'
import UserHotelService from '@Services/user-hotel'
import { IRoom } from '@Interfaces/room'
import { AuthContext } from '../../../AuthProvider'

const Rooms = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const { enqueueSnackbar } = useSnackbar()
    const [rooms, setRooms] = useState<null | IRoom[]>(null)

    const fetchRooms = () => {
        RoomService.getAll()
            .then(response => setRooms(response.data))
            .catch(() => {
                enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
            })
    }

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY)
        if (auth?.user?.role === ROLE_ADMIN) {
            fetchRooms()
        } else if (auth?.user?.role === ROLE_MANAGER && token) {
            UserHotelService.getHotels(token)
                .then(response => {
                    console.log(response)
                })
                .catch(() => {
                    enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                })
        } else {
            navigate(HOME, { replace: true })
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>Suites</title>
                <meta name="robots" content="none" />
            </Helmet>

            <Grid container justifyContent="end">
                <Grid item>
                    <Button variant="contained" component={Link} to={ADMIN_ROOMS_ADD} startIcon={<Add />}>
                        Ajouter une suite
                    </Button>
                </Grid>
            </Grid>

            {rooms && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Titre</TableCell>
                            <TableCell>Hôtel</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(rooms).map(room => (
                            <TableRow key={room.id}>
                                <TableCell>{room.id}</TableCell>
                                <TableCell>{room.title}</TableCell>
                                <TableCell>
                                    <Link to={ADMIN_HOTEL.replace(':hotelId', room.hotelId)}>{room.hotelId}</Link>
                                </TableCell>
                                <TableCell>
                                    <IconButton component={Link} to={ADMIN_ROOMS_EDIT.replace(':roomId', room.id)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}

export default Rooms
