import { model, property } from '@loopback/repository'
import { User } from './user.model'

@model({
    settings: { postgresql: { schema: 'public', table: 'userWithPassword' } }
})
export class UserWithPassword extends User {
    @property({
        type: 'string',
        required: true
    })
    password: string
}
