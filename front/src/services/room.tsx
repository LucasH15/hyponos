import axios from 'axios'

import { IFormSubmitInputs } from '@Interfaces/room'
import { BASE_URL } from '@Constants/request'

interface IGetOne {
    roomId: string
    withHotel?: boolean
}

const add = (token: string, room: IFormSubmitInputs) => {
    return axios.post(`${BASE_URL}/admin/rooms`, JSON.stringify(room), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

const edit = (token: string, roomId: string, room: IFormSubmitInputs) => {
    return axios.patch(`${BASE_URL}/admin/rooms/${roomId}`, JSON.stringify(room), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

const getAll = () => {
    return axios.get(`${BASE_URL}/rooms`)
}

const getOne = ({ roomId, withHotel }: IGetOne) => {
    let url = `${BASE_URL}/rooms/${roomId}`

    if (withHotel) {
        url += `?filter=${JSON.stringify({ include: ['hotel'] })}`
    }

    return axios.get(url)
}

export default {
    add: async (token: string, room: IFormSubmitInputs) => await add(token, room),
    edit: async (token: string, roomId: string, room: IFormSubmitInputs) => await edit(token, roomId, room),
    getAll: async () => await getAll(),
    getOne: async ({ roomId, withHotel }: IGetOne) => await getOne({ roomId, withHotel })
}
