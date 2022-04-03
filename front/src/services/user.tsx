import axios from 'axios'

import { BASE_URL } from '@Constants/request'

interface User {
    email: string
    password: string
}

const register = (user: User) => {
    return axios.post(`${BASE_URL}/users`, JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default {
    register: async (user: User) => await register(user)
}
