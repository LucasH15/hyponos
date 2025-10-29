import { HttpErrors } from '@loopback/rest'
import isemail from 'isemail'

import { passwordValidation } from '../constants'
import { Credentials } from '../repositories'

export function validateCredentials(credentials: Credentials) {
    if (!isemail.validate(credentials.email)) {
        throw new HttpErrors.UnprocessableEntity('Email non valide')
    }

    if (!credentials.password || passwordValidation.test(credentials.password)) {
        throw new HttpErrors.UnprocessableEntity('Mot de passe non valide')
    }
}
