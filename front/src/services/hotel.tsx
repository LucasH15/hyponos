import axios from 'axios'

import { BASE_URL } from '@Constants/request'

interface IHotel {
    name: string
    city: string
    country: string
    postCode: string
    address: string
    description: string
}

const add = (token: string, hotel: IHotel) => {
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

const del = (token: string, hotelId: string) => {
    return axios.delete(`${BASE_URL}/admin/hotels/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    add: async (token: string, hotel: IHotel) => await add(token, hotel),
    getAll: async () => await getAll(),
    getOne: async (hotelId: string) => await getOne(hotelId),
    del: async (token: string, hotelId: string) => await del(token, hotelId)
}
