import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { add, format, isAfter, set } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'

import { isLoggedIn } from '@Utils/user'
import { BookingService, HotelService } from '@Src/services'
import { BOOKING, MY_SPACE, REGISTER } from '@Constants/routes'
import { DATE_FRENCH_FORMAT } from '@Constants/utils'
import { DEFAULT_ERROR_MESSAGE, IS_REQUIRED, MAX_DATE, MIN_DATE } from '@Constants/form'
import { IHotel } from '@Interfaces/hotel'
import { IRoom } from '@Interfaces/room'
import { IFormInputs } from '@Interfaces/booking'

const now = set(new Date(), { hours: 0, minutes: 0, seconds: 0 })
const maxDate = set(add(now, { years: 2 }), { hours: 23, minutes: 59, seconds: 59 })
const schema = yup
    .object()
    .shape(
        {
            from: yup
                .date()
                .transform((curr, orig) => (orig === '' ? null : curr))
                .min(now, `${MIN_DATE} ${format(now, DATE_FRENCH_FORMAT)}`)
                .max(maxDate, `${MAX_DATE} ${format(maxDate, DATE_FRENCH_FORMAT)}`)
                .required(IS_REQUIRED),
            to: yup
                .date()
                .transform((curr, orig) => (orig === '' ? null : curr))
                .max(maxDate, `${MAX_DATE} ${format(maxDate, DATE_FRENCH_FORMAT)}`)
                .test('is-after-from', "La date doit être après l'arrivée", (value, context) => {
                    return !!value && isAfter(value, context.parent.from)
                })
                .required(IS_REQUIRED),
            hotelId: yup.string().uuid(IS_REQUIRED).required(IS_REQUIRED),
            roomId: yup.string().uuid(IS_REQUIRED).required(IS_REQUIRED)
        },
        [['from', 'to']]
    )
    .required()

const Booking = () => {
    const navigate = useNavigate()
    const [hasInitDatas, setHasInitDatas] = useState<boolean>(false)
    const [hotels, setHotels] = useState<[] | IHotel[]>([])
    const [rooms, setRooms] = useState<[] | IRoom[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAvailable, setIsAvailable] = useState<boolean>(false)
    const [searchParams] = useSearchParams()
    const { enqueueSnackbar } = useSnackbar()
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { isValid },
        trigger
    } = useForm<IFormInputs>({
        mode: 'all',
        resolver: yupResolver(schema),
        defaultValues: {
            from: add(now, { seconds: 1 }),
            to: add(now, { seconds: 2 }),
            hotelId: '',
            roomId: ''
        }
    })
    const onSubmit: SubmitHandler<IFormInputs> = async data => {
        if (isAvailable) {
            const user = await isLoggedIn()

            if (user) {
                BookingService.post({ ...data, userId: user.data.id })
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
                navigate(REGISTER, { state: getValues() })
            }
        }
    }

    useEffect(() => {
        HotelService.get({})
            .then(response => {
                setHotels(response.data)

                const _hotelId = searchParams.get('hotelId')

                if (_hotelId) {
                    setValue('hotelId', _hotelId)
                }
            })
            .catch(() => {
                enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                setHotels([])
                setValue('hotelId', '')
                setRooms([])
                setValue('roomId', '', { shouldValidate: true })
            })
    }, [])

    useEffect(() => {
        const _hotelId = getValues('hotelId')
        const _roomId = searchParams.get('roomId')

        if (_hotelId) {
            setValue('roomId', '')
            HotelService.getOne(_hotelId)
                .then(response => {
                    setRooms(response.data.rooms)

                    if (_roomId && !hasInitDatas) {
                        setValue('roomId', _roomId, { shouldValidate: true })
                        setHasInitDatas(true)
                    } else if (hasInitDatas) {
                        setValue('roomId', '', { shouldValidate: true })
                    }
                })
                .catch(() => {
                    enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                    setRooms([])
                    setValue('roomId', '', { shouldValidate: true })
                })
        }
    }, [watch('hotelId')])

    useEffect(() => {
        if (isValid) {
            setIsLoading(true)
            setIsAvailable(false)
            BookingService.check(getValues())
                .then(response => {
                    setIsAvailable(response.data)
                })
                .catch(() => {
                    enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                    setIsAvailable(false)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [isValid])

    useEffect(() => {
        trigger('to')
    }, [watch('from')])

    useEffect(() => {
        trigger('from')
    }, [watch('to')])

    return (
        <>
            <Helmet>
                <title>Réservation - Hyponos</title>
            </Helmet>

            <Typography variant="h1" textAlign="center">
                Faire une réservation
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
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
                                    <DatePicker
                                        {...field}
                                        disablePast
                                        label="Date d'arrivée"
                                        openTo="month"
                                        views={['month', 'day']}
                                        maxDate={maxDate}
                                        inputRef={field.ref}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={invalid}
                                                helperText={error?.message}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    placeholder: 'dd/mm/yyyy'
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="to"
                                control={control}
                                render={({ field, fieldState: { invalid, error } }) => (
                                    <DatePicker
                                        {...field}
                                        disablePast
                                        label="Date de départ"
                                        openTo="month"
                                        views={['month', 'day']}
                                        maxDate={maxDate}
                                        inputRef={field.ref}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={invalid}
                                                helperText={error?.message}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    placeholder: 'dd/mm/yyyy'
                                                }}
                                            />
                                        )}
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
                                        {...field}
                                        fullWidth
                                        select
                                        label="Hôtel"
                                        error={invalid}
                                        helperText={error?.message}
                                        disabled={hotels.length === 0}
                                        inputRef={field.ref}
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
                                name="roomId"
                                control={control}
                                render={({ field, fieldState: { invalid, error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        select
                                        label="Suite"
                                        error={invalid}
                                        helperText={error?.message}
                                        disabled={rooms.length === 0}
                                        inputRef={field.ref}
                                    >
                                        {rooms.map(room => (
                                            <MenuItem key={room.id} value={room.id}>
                                                {room.title}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            {isLoading && (
                                <Stack flexDirection="row" alignItems="center" sx={{ mb: 3 }}>
                                    <CircularProgress sx={{ mr: 4 }} />
                                    <Typography>Vérification des disponibilités</Typography>
                                </Stack>
                            )}
                            {!isLoading && isAvailable && (
                                <Typography sx={{ mb: 3 }}>
                                    Hourra&nbsp;! Cette chambre est disponible&nbsp;!
                                </Typography>
                            )}
                            <Button type="submit" variant="contained">
                                Réserver
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </LocalizationProvider>
        </>
    )
}

export default Booking
