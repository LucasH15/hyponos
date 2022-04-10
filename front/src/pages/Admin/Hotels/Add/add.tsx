import { Button, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

import { IS_REQUIRED, MIN_CHAR } from '@Constants/form'
import { TOKEN_KEY } from '@Constants/request'
import HotelService from '@Services/hotel'

interface IFormInputs {
    name: string
    city: string
    country: string
    postCode: string
    address: string
    description: string
}

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

const AdminHotelsAdd = () => {
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
        const token = localStorage.getItem(TOKEN_KEY)

        if (token) {
            setError(null)
            HotelService.add(token, data)
                .then(() => {
                    enqueueSnackbar("L'hôtel a bien été ajouté", { variant: 'success' })
                    reset()
                })
                .catch(error => {
                    if (error.response) {
                        setError(error.response.data.error.message)
                    } else {
                        setError(
                            'Une erreur est survenue, veuillez réessayer dans un instant. Si le problème persiste, contactez-nous'
                        )
                    }
                })
        }
    }

    return (
        <>
            <Helmet>
                <title>Ajouter un hôtel</title>
                <meta name="robots" content="none" />
            </Helmet>

            <Typography variant="h1" align="center" sx={{ mb: 2 }}>
                Ajouter un hôtel
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
                                <TextField
                                    fullWidth
                                    multiline
                                    label="Description (optionel)"
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
                            Ajouter
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default AdminHotelsAdd
