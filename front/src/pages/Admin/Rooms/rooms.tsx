import { Add, Delete, Edit, Info } from '@mui/icons-material'
import { Button, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { ADMIN_ROOMS_ADD, ADMIN_ROOMS_EDIT } from '@Constants/routes'
import RoomService from '@Services/room'
import { IRoom } from '@Interfaces/room'
import { Link } from 'react-router-dom'

const Rooms = () => {
    const [rooms, setRooms] = useState<null | IRoom[]>(null)

    const fetchRooms = () => {
        RoomService.getAll()
            .then(response => setRooms(response.data))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    return (
        <>
            <Helmet>
                <title>Suites</title>
                <meta name="robots" content="none" />
            </Helmet>
            {console.log(rooms)}
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
                            {/*<TableCell>Adresse</TableCell>*/}
                            {/*<TableCell>Code postal</TableCell>*/}
                            {/*<TableCell>Ville</TableCell>*/}
                            {/*<TableCell>Pays</TableCell>*/}
                            {/*<TableCell>Actions</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(rooms).map(room => (
                            <TableRow key={room.id}>
                                <TableCell>{room.id}</TableCell>
                                <TableCell>{room.title}</TableCell>
                                {/*<TableCell>{hotel.address}</TableCell>*/}
                                {/*<TableCell>{hotel.postCode}</TableCell>*/}
                                {/*<TableCell>{hotel.city}</TableCell>*/}
                                {/*<TableCell>{hotel.country}</TableCell>*/}
                                {/*<TableCell>*/}
                                {/*    <IconButton component={Link} to={ADMIN_ROOMS_EDIT.replace(':roomId', room.id)}>*/}
                                {/*        <Edit />*/}
                                {/*    </IconButton>*/}
                                {/*</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}

export default Rooms
