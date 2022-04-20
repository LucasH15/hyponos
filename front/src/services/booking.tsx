import axios from 'axios'

import { BASE_URL } from '@Constants/request'

interface ICheck {
    from: Date
    to: Date
    roomId: string
}

interface IPost extends ICheck {
    userId: string
}

const post = (form: IPost) => {
    return axios.post(`${BASE_URL}/bookings`, JSON.stringify(form), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const getAll = () => {
    return axios.get(`${BASE_URL}/bookings`)
}

const check = ({ from, to, roomId }: ICheck) => {
    return axios.get(`${BASE_URL}/bookings/check`, {
        params: {
            from,
            to,
            roomId
        }
    })
}

const cancel = (token: string, bookingId: string) => {
    return axios.post(`${BASE_URL}/bookings/cancel`, JSON.stringify({ bookingId }), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    getAll: async () => await getAll(),
    check: async ({ from, to, roomId }: ICheck) => await check({ from, to, roomId }),
    post: async ({ from, to, roomId, userId }: IPost) => await post({ from, to, roomId, userId }),
    cancel: async (token: string, bookingId: string) => await cancel(token, bookingId)
}
