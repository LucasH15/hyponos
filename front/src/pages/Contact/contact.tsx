import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { IFormInputs } from '@Interfaces/contact'
import { ContactService } from '@Src/services'

import { DEFAULT_ERROR_MESSAGE, EMAIL_NOT_VALID, IS_REQUIRED, MIN_CHAR } from '@Constants/form'

const schema = yup
    .object({
        firstName: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        lastName: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        email: yup.string().email(EMAIL_NOT_VALID).required(IS_REQUIRED),
        subject: yup.string().required(IS_REQUIRED),
        message: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED)
    })
    .required()

const Contact = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { control, handleSubmit, reset } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
        }
    })
    const onSubmit: SubmitHandler<IFormInputs> = data => {
        ContactService.send(data)
            .then(() => {
                enqueueSnackbar(
                    'Nous avons bien pris en compte votre message. Nous reviendrons vers vous dans les 48 heures ouvrées',
                    { variant: 'success' }
                )
                reset()
            })
            .catch(() => {
                enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
            })
    }

    return (
        <>
            <Helmet>
                <title>Contact - Hyponos</title>
            </Helmet>

            <Typography variant="h1" textAlign="center" sx={{ mb: 5 }}>
                Contactez-nous
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
                            name="firstName"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="lastName"
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
                            name="email"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Email"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="subject"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    select
                                    label="Sujet"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                >
                                    <MenuItem value="reclamation">Je souhaite poser une réclamation</MenuItem>

                                    <MenuItem value="addService">
                                        Je souhaite commander un service supplémentaire
                                    </MenuItem>

                                    <MenuItem value="roomInfo">Je souhaite en savoir plus sur une suite</MenuItem>

                                    <MenuItem value="bugReport">J’ai un souci avec cette application</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="message"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    multiline
                                    label="Message"
                                    error={invalid}
                                    helperText={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">
                            Envoyer
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default Contact
