import { Button, FormControl, FormHelperText, FormLabel, Grid, TextField, Typography } from '@mui/material'
import { setOptions } from 'filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FilePond, registerPlugin } from 'react-filepond'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

import { IFormInputs } from '@Interfaces/hotel'
import { DEFAULT_ERROR_MESSAGE, IS_REQUIRED, MIN_CHAR } from '@Constants/form'
import { TOKEN_KEY } from '@Constants/request'
import HotelService from '@Services/hotel'

registerPlugin(FilePondPluginImagePreview)

setOptions({
    labelIdle: 'Faites glisser et déposez vos fichiers ou <span class="filepond--label-action">rechercher</span>'
})

const schema = yup
    .object({
        name: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        mainPicture: yup.mixed().required(IS_REQUIRED),
        pictures: yup.array(yup.mixed()),
        city: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        country: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        postCode: yup.string(),
        address: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        description: yup.string()
    })
    .required()

const AdminHotelsAdd = () => {
    const [error, setError] = useState<string | null>(null)
    const { enqueueSnackbar } = useSnackbar()
    const { control, handleSubmit, reset, getValues, setValue } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            mainPicture: undefined,
            pictures: [],
            city: '',
            country: '',
            postCode: undefined,
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
                        setError(DEFAULT_ERROR_MESSAGE)
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

            <Typography variant="h1" align="center">
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
                            name="mainPicture"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <FormControl fullWidth error={invalid}>
                                    <FormLabel>Image principale</FormLabel>
                                    <FilePond
                                        files={getValues('mainPicture') ? [getValues('mainPicture')] : []}
                                        onupdatefiles={fileItem => {
                                            setValue('mainPicture', fileItem[0]?.file as File)
                                        }}
                                        {...field}
                                    />
                                    <FormHelperText>{error?.message}</FormHelperText>
                                </FormControl>
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
                                    label="Code postal (optionnel)"
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
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="pictures"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <FormLabel>Images (optionnel)</FormLabel>
                                    <FilePond
                                        allowMultiple
                                        files={getValues('pictures')}
                                        onupdatefiles={fileItems => {
                                            setValue(
                                                'pictures',
                                                fileItems.map(fileItem => fileItem.file as File)
                                            )
                                        }}
                                        {...field}
                                    />
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

export default AdminHotelsAdd
