import axios from 'axios'

import { BASE_URL } from '@Constants/request'

interface IUser {
    email: string
    password: string
}

interface IUserFromBack {
    email: string
    role: string
}

interface IUserEdition {
    role: string
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

const getAll = (token: string) => {
    return axios.get(`${BASE_URL}/admin/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const add = (token: string, user: IUserFromBack) => {
    return axios.post(`${BASE_URL}/admin/users`, JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

const del = (token: string, userId: string) => {
    return axios.delete(`${BASE_URL}/admin/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const edit = (token: string, userId: string, user: IUserEdition) => {
    return axios.patch(`${BASE_URL}/admin/users/${userId}`, JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    register: async (user: IUser) => await register(user),
    login: async (user: IUser) => await login(user),
    me: async (token: string) => await me(token),
    getAll: async (token: string) => await getAll(token),
    add: async (token: string, user: IUserFromBack) => await add(token, user),
    del: async (token: string, userId: string) => await del(token, userId),
    edit: async (token: string, userId: string, user: IUserEdition) => await edit(token, userId, user)
}
