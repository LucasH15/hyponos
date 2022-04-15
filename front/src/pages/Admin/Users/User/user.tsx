import BasicDialog from '@Components/BasicDialog'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Delete } from '@mui/icons-material'
import {
    Button,
    Grid,
    IconButton,
    MenuItem,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { IHotel } from '@Interfaces/hotel'
import { IFormInputs } from '@Interfaces/room'
import { TOKEN_KEY } from '@Constants/request'
import { ROLE_MANAGER } from '@Constants/roles'
import { DEFAULT_ERROR_MESSAGE, IS_REQUIRED } from '@Constants/form'
import { ADMIN_USERS } from '@Constants/routes'
import UserService from '@Services/user'
import UserHotelService from '@Services/user-hotel'
import HotelService from '@Services/hotel'
import { IUser } from '@Interfaces/user'
import * as yup from 'yup'

const schema = yup
    .object({
        hotelId: yup.string().uuid(IS_REQUIRED).required(IS_REQUIRED)
    })
    .required()

const User = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const { userId } = useParams()
    const [error, setError] = useState<null | string>(null)
    const [user, setUser] = useState<null | IUser>(null)
    const [hotels, setHotels] = useState<[] | IHotel[]>([])
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [currentHotelId, setCurrentHotelId] = useState<string | null>(null)
    const { control, handleSubmit, reset } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            hotelId: ''
        }
    })

    const fetchUser = () => {
        if (token && userId) {
            UserService.getOne(token, userId)
                .then(user => {
                    setUser(user.data)
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        navigate(ADMIN_USERS, { replace: true })
                    } else {
                        enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                    }
                })
        } else {
            navigate(ADMIN_USERS, { replace: true })
        }
    }

    const deleteUserHotel = () => {
        if (token && currentHotelId && userId) {
            UserHotelService.del(token, userId, currentHotelId)
                .then(() => {
                    enqueueSnackbar("L'assignation a bien été supprimé", { variant: 'success' })
                    fetchUser()
                })
                .catch(error => {
                    let errorMessage = DEFAULT_ERROR_MESSAGE
                    if (error.response) {
                        errorMessage = error.response.data.error.message
                    }
                    enqueueSnackbar(errorMessage, { variant: 'error' })
                })
        }
    }

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        if (token && user) {
            setError(null)
            UserHotelService.add(token, user.id, data.hotelId)
                .then(() => {
                    reset()
                    fetchUser()
                })
                .catch(error => {
                    if (error.response) {
                        setError(error.response.data.error.message)
                    } else {
                        setError(DEFAULT_ERROR_MESSAGE)
                    }
                })
        }
    }

    const fetchHotels = () => {
        HotelService.getAll()
            .then(response => {
                let _hotels = response.data

                if (user?.hotels) {
                    user?.hotels.forEach(hotel => {
                        _hotels = _.filter(_hotels, _hotel => _hotel.id !== hotel.id)
                    })
                }

                setHotels(_hotels)
            })
            .catch(error => {
                if (error.response) {
                    setError(error.response.data.error.message)
                } else {
                    setError(DEFAULT_ERROR_MESSAGE)
                }
            })
    }

    useEffect(() => {
        fetchUser()
    }, [userId])

    useEffect(() => {
        if (user?.role === ROLE_MANAGER) {
            fetchHotels()
        }
    }, [user])

    return (
        <>
            <Helmet>
                <title>Utilisateur</title>
                <meta name="robots" content="none" />
            </Helmet>

            {user && (
                <>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h1">
                                Utilisateur {user?.firstName} {user?.lastName}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <p>Id: {user.id}</p>
                            <p>Email: {user.email}</p>
                            <p>Rôle: {user.role}</p>
                        </Grid>

                        {user.role === ROLE_MANAGER && hotels.length > 0 && (
                            <Grid item xs={12}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Stack alignItems="start" flexDirection="column">
                                        <Controller
                                            name="hotelId"
                                            control={control}
                                            render={({ field, fieldState: { invalid, error } }) => (
                                                <TextField
                                                    fullWidth
                                                    select
                                                    label="Hôtel"
                                                    error={invalid}
                                                    helperText={error?.message}
                                                    sx={{ maxWidth: 300, mb: 2 }}
                                                    {...field}
                                                >
                                                    {hotels.map(hotel => (
                                                        <MenuItem key={hotel.id} value={hotel.id}>
                                                            {hotel.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            )}
                                        />

                                        {error && (
                                            <Typography component="p" sx={{ color: 'error.main', mb: 2 }}>
                                                {error}
                                            </Typography>
                                        )}

                                        <Button type="submit" variant="contained">
                                            Assigner cet hôtel
                                        </Button>
                                    </Stack>
                                </form>
                            </Grid>
                        )}

                        {user.hotels && (
                            <>
                                <Typography variant="h2">Hôtels assignés</Typography>

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Nom</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user.hotels.map(hotel => (
                                            <TableRow key={hotel.id}>
                                                <TableCell>{hotel.id}</TableCell>
                                                <TableCell>{hotel.name}</TableCell>
                                                <TableCell>
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

                                <BasicDialog
                                    title="Voulez-vous vraiment supprimer cette assignation ?"
                                    handleOk={deleteUserHotel}
                                    open={openDeleteDialog}
                                    handleClose={() => {
                                        setOpenDeleteDialog(false)
                                        setCurrentHotelId(null)
                                    }}
                                />
                            </>
                        )}
                    </Grid>
                </>
            )}
        </>
    )
}

export default User
