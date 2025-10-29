import { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { BookingService } from '@Src/services'
import { DEFAULT_ERROR_MESSAGE, EMAIL_NOT_VALID, IS_REQUIRED } from '@Constants/form'
import { BOOKING, MY_SPACE, REGISTER } from '@Constants/routes'
import { TOKEN_KEY } from '@Constants/request'
import UserService from '@Services/user'
import { AuthContext } from '@Src/AuthProvider'

interface IState {
    register?: string
    from?: Date
    to?: Date
    roomId?: string
}

interface IFormInputs {
    email: string
    password: string
}

const schema = yup
    .object({
        email: yup.string().email(EMAIL_NOT_VALID).required(IS_REQUIRED),
        password: yup.string().required(IS_REQUIRED)
    })
    .required()

const Login = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [error, setError] = useState<string | null>(null)
    const location = useLocation()
    const state = location.state as IState
    const { control, handleSubmit } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit: SubmitHandler<IFormInputs> = data => {
        setError(null)
        UserService.login(data)
            .then(response => {
                const token = response.data.token
                if (token) {
                    auth.login(token, true).then(user => {
                        localStorage.setItem(TOKEN_KEY, token)

                        if (state) {
                            const { from, to, roomId } = state

                            if (roomId && from && to) {
                                BookingService.post({ from, to, roomId, userId: user.id })
                                    .then(response => {
                                        if (response.data) {
                                            navigate(MY_SPACE)
                                        } else {
                                            navigate(BOOKING, { state: { unavailable: true } })
                                        }
                                    })
                                    .catch(() => {
                                        enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                                    })
                            } else {
                                navigate(MY_SPACE, { replace: true })
                            }
                        } else {
                            navigate(MY_SPACE, { replace: true })
                        }
                    })
                } else {
                    throw new Error()
                }
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
        if (state?.register === 'success') {
            enqueueSnackbar("Vous êtes bien inscrit, plus qu'à vous connecter pour profiter de notre site", {
                variant: 'success'
            })
        }
    }, [state])

    return (
        <>
            <Helmet>
                <title>Connexion</title>
            </Helmet>

            <Typography variant="h1" align="center">
                Connexion
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
                            name="password"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Mot de passe"
                                    error={invalid}
                                    helperText={error?.message}
                                    type="password"
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
                            Me connecter
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Grid
                container
                sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    px: 4
                }}
                alignItems="center"
            >
                <p>Vous n&apos;avez pas encore de compte ?</p>
                &nbsp;
                <Button component={Link} to={REGISTER} state={state}>
                    Je m&apos;inscris
                </Button>
            </Grid>
        </>
    )
}

export default Login
