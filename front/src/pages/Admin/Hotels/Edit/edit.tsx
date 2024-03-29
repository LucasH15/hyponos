import { Button, Grid, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
import { ADMIN_HOTELS } from '@Constants/routes'
import { IFormInputs } from '@Interfaces/hotel'
import { DEFAULT_ERROR_MESSAGE, IS_REQUIRED, MIN_CHAR } from '@Constants/form'
import { TOKEN_KEY } from '@Constants/request'
import { HotelService, UserService } from '@Services/index'
import { AuthContext } from '@Src/AuthProvider'

const schema = yup
    .object({
        name: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        city: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        country: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        postCode: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        address: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        description: yup.string()
    })
    .required()

const AdminHotelsEdit = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const { hotelId } = useParams()
    const [error, setError] = useState<string | null>(null)
    const { enqueueSnackbar } = useSnackbar()
    const { control, handleSubmit, reset } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            city: '',
            country: '',
            postCode: '',
            address: '',
            description: ''
        }
    })
    const onSubmit: SubmitHandler<IFormInputs> = data => {
        if (token && hotelId) {
            setError(null)
            HotelService.edit(token, hotelId, data)
                .then(() => {
                    enqueueSnackbar("L'hôtel a bien été modifié", { variant: 'success' })
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

    useEffect(() => {
        if (hotelId) {
            if (auth.user?.role === ROLE_ADMIN) {
                HotelService.getOne(hotelId)
                    .then(hotel => {
                        reset(hotel.data)
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            navigate(ADMIN_HOTELS, { replace: true })
                        } else {
                            enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                        }
                    })
            } else if (auth.user?.role === ROLE_MANAGER && token) {
                UserService.me({ token, hotelId })
                    .then(response => {
                        const hotels = response.data.hotels
                        if (hotels.length === 0) {
                            navigate(ADMIN_HOTELS, { replace: true })
                        } else {
                            reset(hotels[0])
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        } else {
            navigate(ADMIN_HOTELS, { replace: true })
        }
    }, [hotelId])

    return (
        <>
            <Helmet>
                <title>Modifier un hôtel</title>
                <meta name="robots" content="none" />
            </Helmet>

            <Typography variant="h1" align="center">
                Modifier un hôtel
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    flexDirection="column"
                    sx={{
                        maxWidth: '600px',
                        mx: 'auto',
                        p: 4
                    }}
                    rowSpacing={12}
                >
                    <Grid item xs={12}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Adresse"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="postCode"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Code postal"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Ville"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="country"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Pays"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField // TODO replace by WYSIWYG
                                    fullWidth
                                    multiline
                                    label="Description (optionnel)"
                                    error={invalid}
                                    helperText={error?.message}
                                    rows={4}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        {error && (
                            <Typography component="p" sx={{ color: 'error.main', mb: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained">
                            Modifier
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default AdminHotelsEdit
