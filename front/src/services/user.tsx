import axios from 'axios'

import { BASE_URL } from '@Constants/request'

interface IUser {
    email: string
    password: string
}

const register = (user: IUser) => {
    return axios.post(`${BASE_URL}/users`, JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const login = (user: IUser) => {
    return axios.post(`${BASE_URL}/users/login`, JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const me = (token: string) => {
    return axios.get(`${BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    register: async (user: IUser) => await register(user),
    login: async (user: IUser) => await login(user),
    me: async (token: string) => await me(token)
}
