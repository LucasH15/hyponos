import axios from 'axios'

import { BASE_URL } from '@Constants/request'

const getAll = () => {
    return axios.get(`${BASE_URL}/rooms`)
}

export default {
    getAll: async () => await getAll()
}
