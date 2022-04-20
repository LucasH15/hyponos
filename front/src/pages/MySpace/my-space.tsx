import BasicDialog from '@Components/BasicDialog'
import { Delete } from '@mui/icons-material'
import { add, format, isAfter } from 'date-fns'
import { useSnackbar } from 'notistack'
import { SyntheticEvent, useEffect, useState } from 'react'
import {
    Grid,
    IconButton,
    Link as MuiLink,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    Typography
} from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { IUser } from '@Interfaces/user'
import { DATE_FRENCH_FORMAT } from '@Constants/utils'
import { ACCEPTED, CANCELLED } from '@Constants/booking'
import { HOTELS } from '@Constants/routes'
import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'
import { TOKEN_KEY } from '@Constants/request'
import { BookingService, UserService } from '@Src/services'

const MySpace = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const [value, setValue] = useState<number>(0)
    const [user, setUser] = useState<null | IUser>(null)
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [currentBookingId, setCurrentBookingId] = useState<string | null>(null)
    const { enqueueSnackbar } = useSnackbar()

    const fetchUser = () => {
        if (token) {
            UserService.me({ token, withBookings: true })
                .then(response => {
                    setUser(response.data)
                })
                .catch(() => {
                    enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                })
        }
    }

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const cancelBooking = () => {
        if (token && currentBookingId) {
            BookingService.cancel(token, currentBookingId)
                .then(() => {
                    enqueueSnackbar('Votre réservation a bien été annulé', { variant: 'success' })
                    fetchUser()
                })
                .catch(() => {
                    enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                })
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <Helmet>
                <title>Mon espace</title>
                <meta name="robots" content="none" />
            </Helmet>

            <Typography variant="h1" align="center">
                Mon espace
            </Typography>

            {user && (
                <>
                    <Grid sx={{ width: '100%' }}>
                        <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Mes réservations" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                            </Tabs>
                        </Grid>
                        <div role="tabpanel" hidden={value !== 0} id="simple-tabpanel-0" aria-labelledby="simple-tab-0">
                            {value === 0 && (
                                <Grid sx={{ p: 3 }}>
                                    {user.bookings ? (
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Du</TableCell>
                                                    <TableCell>Au</TableCell>
                                                    <TableCell>Hôtel</TableCell>
                                                    <TableCell>Chambre</TableCell>
                                                    <TableCell>Statut</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {user.bookings.map(booking => (
                                                    <TableRow key={booking.id}>
                                                        <TableCell>
                                                            {format(new Date(booking.from), DATE_FRENCH_FORMAT)}
                                                        </TableCell>
                                                        <TableCell>
                                                            {format(new Date(booking.to), DATE_FRENCH_FORMAT)}
                                                        </TableCell>
                                                        <TableCell>{booking.room.hotel.name}</TableCell>
                                                        <TableCell>{booking.room.title}</TableCell>
                                                        <TableCell>
                                                            {booking.status === 'accepted' ? ACCEPTED : CANCELLED}
                                                        </TableCell>
                                                        <TableCell>
                                                            {booking.status !== 'cancelled' &&
                                                                isAfter(
                                                                    new Date(booking.from),
                                                                    add(new Date(), { days: 2 })
                                                                ) && (
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            setOpenDeleteDialog(true)
                                                                            setCurrentBookingId(booking.id)
                                                                        }}
                                                                    >
                                                                        <Delete />
                                                                    </IconButton>
                                                                )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <>
                                            <Typography>
                                                Pas encore de réservations&nbsp;?{' '}
                                                <MuiLink underline="hover" component={Link} to={HOTELS}>
                                                    Découvrez nos hôtels
                                                </MuiLink>
                                            </Typography>
                                        </>
                                    )}
                                </Grid>
                            )}
                        </div>
                    </Grid>

                    <BasicDialog
                        title="Voulez-vous vraiment annuler cette réservation ?"
                        handleOk={cancelBooking}
                        open={openDeleteDialog}
                        handleClose={() => {
                            setOpenDeleteDialog(false)
                            setCurrentBookingId(null)
                        }}
                    />
                </>
            )}
        </>
    )
}

export default MySpace
