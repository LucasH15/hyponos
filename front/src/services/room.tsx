import axios from 'axios'

import { IFormInputs } from '@Interfaces/room'
import { BASE_URL } from '@Constants/request'

const add = (token: string, room: IFormInputs) => {
    return axios.post(`${BASE_URL}/admin/rooms`, JSON.stringify(room), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

const getAll = () => {
    return axios.get(`${BASE_URL}/rooms`)
}

export default {
    add: async (token: string, room: IFormInputs) => await add(token, room),
    getAll: async () => await getAll()
}
