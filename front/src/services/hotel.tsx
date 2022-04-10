import axios from 'axios'

import { IFormInputs } from '@Interfaces/hotel'
import { BASE_URL } from '@Constants/request'

const add = (token: string, hotel: IFormInputs) => {
    return axios.post(`${BASE_URL}/admin/hotels`, JSON.stringify(hotel), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

const getAll = () => {
    return axios.get(`${BASE_URL}/hotels`)
}

const getOne = (hotelId: string) => {
    return axios.get(`${BASE_URL}/hotels/${hotelId}`)
}

const edit = (token: string, hotelId: string, hotel: IFormInputs) => {
    return axios.patch(`${BASE_URL}/admin/hotels/${hotelId}`, JSON.stringify(hotel), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

const del = (token: string, hotelId: string) => {
    return axios.delete(`${BASE_URL}/admin/hotels/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    add: async (token: string, hotel: IFormInputs) => await add(token, hotel),
    getAll: async () => await getAll(),
    getOne: async (hotelId: string) => await getOne(hotelId),
    edit: async (token: string, hotelId: string, hotel: IFormInputs) => await edit(token, hotelId, hotel),
    del: async (token: string, hotelId: string) => await del(token, hotelId)
}
