import { Button, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Add, Delete, Edit, Info } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { TOKEN_KEY } from '@Constants/request'
import { ADMIN_HOTEL, ADMIN_HOTELS_ADD, ADMIN_HOTELS_EDIT } from '@Constants/routes'
import BasicDialog from '@Components/BasicDialog'
import HotelService from '@Services/hotel'
import { IHotel } from '@Interfaces/hotel'

const AdminHotels = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [currentHotelId, setCurrentHotelId] = useState<string | null>(null)
    const [hotels, setHotels] = useState<null | IHotel[]>(null)
    const { enqueueSnackbar } = useSnackbar()

    const deleteHotel = () => {
        if (token && currentHotelId) {
            HotelService.del(token, currentHotelId)
                .then(() => {
                    enqueueSnackbar("L'hotel a bien été supprimé", { variant: 'success' })
                    fetchHotels()
                })
                .catch(error => {
                    let errorMessage = 'Une erreur est survenue, veuillez réessayer dans quelques instants'
                    if (error.response) {
                        errorMessage = error.response.data.error.message
                    }
                    enqueueSnackbar(errorMessage, {
                        variant: 'error'
                    })
                })
        }
    }

    const fetchHotels = () => {
        HotelService.getAll()
            .then(response => setHotels(response.data))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchHotels()
    }, [])

    return (
        <>
            <Helmet>
                <title>Hôtels</title>
                <meta name="robots" content="none" />
            </Helmet>

            <Grid container justifyContent="end">
                <Grid item>
                    <Button variant="contained" component={Link} to={ADMIN_HOTELS_ADD} startIcon={<Add />}>
                        Ajouter un hôtel
                    </Button>
                </Grid>
            </Grid>

            {hotels && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Adresse</TableCell>
                            <TableCell>Code postal</TableCell>
                            <TableCell>Ville</TableCell>
                            <TableCell>Pays</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(hotels).map(hotel => (
                            <TableRow key={hotel.id}>
                                <TableCell>
                                    <Button component={Link} to={ADMIN_HOTEL.replace(':hotelId', hotel.id)}>
                                        {hotel.id}
                                    </Button>
                                </TableCell>
                                <TableCell>{hotel.name}</TableCell>
                                <TableCell>{hotel.address}</TableCell>
                                <TableCell>{hotel.postCode}</TableCell>
                                <TableCell>{hotel.city}</TableCell>
                                <TableCell>{hotel.country}</TableCell>
                                <TableCell>
                                    <IconButton component={Link} to={ADMIN_HOTEL.replace(':hotelId', hotel.id)}>
                                        <Info />
                                    </IconButton>

                                    <IconButton component={Link} to={ADMIN_HOTELS_EDIT.replace(':hotelId', hotel.id)}>
                                        <Edit />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => {
                                            setOpenDeleteDialog(true)
                                            setCurrentHotelId(hotel.id)
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <BasicDialog
                title="Voulez-vous vraiment supprimer cet hôtel ?"
                handleOk={deleteHotel}
                open={openDeleteDialog}
                handleClose={() => {
                    setOpenDeleteDialog(false)
                    setCurrentHotelId(null)
                }}
            />
        </>
    )
}

export default AdminHotels
