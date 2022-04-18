import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import * as yup from 'yup'

import { IS_REQUIRED } from '@Constants/form'
import { IFormInputs } from '@Interfaces/booking'

const schema = yup
    .object({
        from: yup.date().min(new Date()).required(IS_REQUIRED),
        to: yup.date().min(new Date()).required(IS_REQUIRED),
        hotelId: yup.string().uuid(IS_REQUIRED).required(IS_REQUIRED),
        roomId: yup.string().uuid(IS_REQUIRED).required(IS_REQUIRED)
    })
    .required()

const Booking = () => {
    const [error, setError] = useState<string | null>(null)
    const [searchParams] = useSearchParams()
    const { enqueueSnackbar } = useSnackbar()
    const { control, handleSubmit, reset, setValue, getValues } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            from: new Date(),
            to: new Date(),
            hotelId: '',
            roomId: ''
        }
    })
    const onSubmit: SubmitHandler<IFormInputs> = data => {
        console.log(data)
    }

    useEffect(() => {
        console.log(searchParams.get('hotelId'))
        console.log(searchParams.get('roomId'))
    }, [])

    return (
        <>
            <Helmet>
                <title>Réservation - Hyponos</title>
            </Helmet>

            <Typography variant="h1" textAlign="center">
                Faire une réservation
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
                            name="from"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Date d'arrivée"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="to"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Date de départ"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
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
                                    {...field}
                                >
                                    <MenuItem value="ok">OK</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="roomId"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    select
                                    label="Suite"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                >
                                    <MenuItem value="ok">OK</MenuItem>
                                </TextField>
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

export default Booking
