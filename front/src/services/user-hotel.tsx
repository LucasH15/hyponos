import axios from 'axios'

import { BASE_URL } from '@Constants/request'

const add = (token: string, userId: string, hotelId: string) => {
    return axios.post(
        `${BASE_URL}/admin/user-hotels`,
        { userId, hotelId },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

const getHotels = (token: string) => {
    return axios.get(`${BASE_URL}/admin/user-hotels`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    add: async (token: string, userId: string, hotelId: string) => await add(token, userId, hotelId),
    getHotels: async (token: string) => await getHotels(token)
}
