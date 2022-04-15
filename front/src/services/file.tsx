import axios from 'axios'

import { BASE_URL } from '@Constants/request'
import _ from 'lodash'

const add = (token: string, files: File | File[]) => {
    const formData = new FormData()

    if (_.isArray(files)) {
        files.forEach(file => {
            formData.append('image', file)
        })
    } else {
        formData.append('image', files)
    }

    return axios.post(`${BASE_URL}/files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    add: async (token: string, files: File | File[]) => await add(token, files)
}
