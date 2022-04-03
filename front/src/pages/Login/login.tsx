import { useContext, useEffect, useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import UserService from '@Services/user'
import { AuthContext } from '../../AuthProvider'

interface IState {
    register?: string
}

interface IFormInputs {
    email: string
    password: string
}

const schema = yup
    .object({
        email: yup.string().email("Cette adresse email n'est pas valide").required('Ce champ est requis'),
        password: yup
            .string()
            .min(8, 'Votre mot de passe doit contenir au minimum 8 caractères')
            .required('Ce champ est requis')
    })
    .required()

const Login = () => {
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
                    auth.login(token, () => {
                        localStorage.setItem('hyponosToken', token)
                        navigate('/dashboard', { replace: true })
                    })
                }

                throw new Error()
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

    useEffect(() => {
        if (state?.register === 'success') {
            toast.success("Vous êtes bien inscrit, plus qu'à vous connecter pour profiter de notre site")
        }
    }, [state])

    return (
        <>
            <Helmet>
                <title>Connexion</title>
            </Helmet>

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
        </>
    )
}

export default Login
