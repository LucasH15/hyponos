import { useContext, useEffect, useState } from 'react'
import { Button, FormControl, FormHelperText, FormLabel, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import _ from 'lodash'
import { useSnackbar } from 'notistack'
import NumberFormat from 'react-number-format'
import { FilePond, registerPlugin } from 'react-filepond'
import { setOptions } from 'filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
import { ADMIN_ROOMS } from '@Constants/routes'
import { IHotel } from '@Interfaces/hotel'
import { IFormInputs } from '@Interfaces/room'
import { DEFAULT_ERROR_MESSAGE, INTEGER_NUMBER, IS_REQUIRED, MIN_CHAR, POSITIF_NUMBER } from '@Constants/form'
import { TOKEN_KEY } from '@Constants/request'
import { FileService, HotelService, RoomService, UserService } from '@Services/index'
import { AuthContext } from '@Src/AuthProvider'

registerPlugin(FilePondPluginImagePreview)

setOptions({
    labelIdle: 'Faites glisser et déposez vos fichiers ou <span class="filepond--label-action">rechercher</span>'
})

const schema = yup
    .object({
        title: yup.string().min(2, MIN_CHAR).required(IS_REQUIRED),
        mainPicture: yup.mixed().required(IS_REQUIRED),
        description: yup.string(),
        pictures: yup.array(yup.mixed()),
        price: yup.number().positive(POSITIF_NUMBER).required(IS_REQUIRED),
        nbRooms: yup.number().integer(INTEGER_NUMBER).positive(POSITIF_NUMBER).required(IS_REQUIRED),
        hotelId: yup.string().uuid(IS_REQUIRED).required(IS_REQUIRED)
    })
    .required()

const AdminRoomsEdit = () => {
    const auth = useContext(AuthContext)
    const token = localStorage.getItem(TOKEN_KEY)
    const { roomId } = useParams()
    const navigate = useNavigate()
    const [fileIsModified, setFileIsModified] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [hotels, setHotels] = useState<[] | IHotel[]>([])
    const { enqueueSnackbar } = useSnackbar()
    const { control, handleSubmit, reset, setValue, getValues } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            mainPicture: undefined,
            description: '',
            pictures: [],
            hotelId: ''
        }
    })
    const onSubmit: SubmitHandler<IFormInputs> = async data => {
        console.log(data)
        if (token && roomId) {
            let file: boolean | string = false
            setError(null)

            if (fileIsModified) {
                const response = await FileService.add(token, data.mainPicture)
                file = response.data.files[0].filename
            }

            //         .then((file: string) => {
            //             let pictures: string[] = []
            //             if (data?.pictures?.length) {
            //                 console.log('have pictures')
            //                 FileService.add(token, data.pictures).then(response => {
            //                     pictures = response.data.files.map((_file: { filename: string }) => _file.filename)
            //                 })
            //             }
            //             console.log(pictures)
            //             return { file, pictures }
            //         })

            const form = {
                ..._.omit(data, ['mainPicture', 'pictures']),
                mainPicture: file ? (file as string) : data.mainPicture.name,
                pictures: []
            }

            RoomService.edit(token, roomId, form)
                .then(() => {
                    enqueueSnackbar('La suite a bien été ajouté', { variant: 'success' })
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

    useEffect(() => {
        if (auth?.user?.role === ROLE_ADMIN) {
            HotelService.get({}).then(response => {
                setHotels(response.data)
            })
        } else if (auth?.user?.role === ROLE_MANAGER && token) {
            UserService.me({ token, withHotels: true }).then(response => {
                setHotels(response.data.hotels)
            })
        }
    }, [])

    useEffect(() => {
        if (roomId) {
            RoomService.getOne({ roomId })
                .then(room => {
                    reset(room.data)
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        navigate(ADMIN_ROOMS, { replace: true })
                    } else {
                        enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                    }
                })
        } else {
            navigate(ADMIN_ROOMS, { replace: true })
        }
    }, [roomId])

    return (
        <>
            <Helmet>
                <title>Modifier une suite</title>
                <meta name="robots" content="none" />
            </Helmet>

            <Typography variant="h1" align="center">
                Modifier une suite
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
                            name="title"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Titre"
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
                                            setFileIsModified(true)
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
                            name="price"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => {
                                return (
                                    <NumberFormat
                                        fullWidth
                                        label="Prix par nuit"
                                        error={invalid}
                                        helperText={error?.message}
                                        customInput={TextField}
                                        isNumericString
                                        suffix="€"
                                        decimalSeparator=","
                                        decimalScale={2}
                                        allowNegative={false}
                                        onValueChange={values => {
                                            setValue('price', values.floatValue ?? 0)
                                        }}
                                        {..._.omit(field, 'onChange')}
                                    />
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="nbRooms"
                            control={control}
                            render={({ field, fieldState: { invalid, error } }) => (
                                <TextField
                                    fullWidth
                                    label="Nombre de chambres"
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
                                    {hotels.map(hotel => (
                                        <MenuItem key={hotel.id} value={hotel.id}>
                                            {hotel.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                            Modifier
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default AdminRoomsEdit
