import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

import { HOME } from '@Constants/routes'
import { TOKEN_KEY } from '@Constants/request'
import { ROLE_ADMIN, ROLE_MANAGER, ROLE_USER } from '@Constants/roles'
import UserService from '@Services/user'

interface IFormInputs {
    email: string
    role: string
}

const schema = yup
    .object({
        email: yup.string().email("Cette adresse email n'est pas valide").required('Ce champ est requis'),
        role: yup.string().required('Ce champ est requis')
    })
    .required()

const AdminUsersAdd = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const { enqueueSnackbar } = useSnackbar()
    const { control, handleSubmit, reset } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            role: ''
        }
    })
    const onSubmit: SubmitHandler<IFormInputs> = data => {
        const token = localStorage.getItem(TOKEN_KEY)

        if (!token) {
            navigate(HOME, { replace: true })
        } else {
            setError(null)
            UserService.add(token, data)
                .then(() => {
                    enqueueSnackbar("L'utilisateur a bien été ajouté", { variant: 'success' })
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
                <title>Ajouter un utilisateur</title>
                <meta name="robots" content="none" />
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
                            name="role"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <FormControl fullWidth error={invalid}>
                                    <InputLabel id="mui-component-select-role">Rôle</InputLabel>
                                    <Select label="Rôle" {...field}>
                                        <MenuItem value={ROLE_USER}>Utiliseur</MenuItem>
                                        <MenuItem value={ROLE_MANAGER}>Manager</MenuItem>
                                        <MenuItem value={ROLE_ADMIN}>Admin</MenuItem>
                                    </Select>
                                    <FormHelperText>{error?.message}</FormHelperText>
                                </FormControl>
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

export default AdminUsersAdd
