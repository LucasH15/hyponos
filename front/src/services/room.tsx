import axios from 'axios'

import { IFormSubmitInputs } from '@Interfaces/room'
import { BASE_URL } from '@Constants/request'

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

const getOne = (roomId: string) => {
    return axios.get(`${BASE_URL}/rooms/${roomId}`)
}

export default {
    add: async (token: string, room: IFormSubmitInputs) => await add(token, room),
    edit: async (token: string, roomId: string, room: IFormSubmitInputs) => await edit(token, roomId, room),
    getAll: async () => await getAll(),
    getOne: async (roomId: string) => await getOne(roomId)
}
