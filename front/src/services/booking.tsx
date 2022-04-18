import axios from 'axios'

import { BASE_URL } from '@Constants/request'

const get = () => {
    return axios.get(`${BASE_URL}/bookings`)
}

export default {
    get: async () => await get()
}
