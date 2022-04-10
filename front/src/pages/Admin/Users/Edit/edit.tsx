import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

import { DEFAULT_ERROR_MESSAGE, IS_REQUIRED } from '@Constants/form'
import { HOME } from '@Constants/routes'
import { TOKEN_KEY } from '@Constants/request'
import { ROLE_ADMIN, ROLE_MANAGER, ROLE_USER } from '@Constants/roles'
import UserService from '@Services/user'

interface IFormInputs {
    role: string
}

const schema = yup
    .object({
        role: yup.string().required(IS_REQUIRED)
    })
    .required()

const AdminUsersEdit = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [error, setError] = useState<string | null>(null)
    const { enqueueSnackbar } = useSnackbar()
    const { control, handleSubmit } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            role: ''
        }
    })
    const onSubmit: SubmitHandler<IFormInputs> = data => {
        const token = localStorage.getItem(TOKEN_KEY)

        if (!token || !userId) {
            navigate(HOME, { replace: true })
        } else {
            setError(null)
            UserService.edit(token, userId, data)
                .then(() => {
                    enqueueSnackbar("L'utilisateur a bien été modifié", { variant: 'success' })
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

    return (
        <>
            <Helmet>
                <title>Modifier un utilisateur</title>
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
                            Modifier
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default AdminUsersEdit
