import axios from 'axios'

import { IFormInputs } from '@Interfaces/contact'
import { BASE_URL } from '@Constants/request'

const send = (form: IFormInputs) => {
    return axios.post(`${BASE_URL}/contact`, JSON.stringify(form), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default {
    send: async (form: IFormInputs) => await send(form)
}
