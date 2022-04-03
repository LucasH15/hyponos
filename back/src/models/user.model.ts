import { Entity, model, property, hasOne } from '@loopback/repository'
import { UserCredentials } from './user-credentials.model'

@model({
    settings: {
        indexes: {
            uniqueEmail: {
                keys: {
                    email: 1
                },
                options: {
                    unique: true
                }
            }
        }
    }
})
export class User extends Entity {
    @property({
        type: 'string',
        id: true
    })
    id: string

    @property({
        type: 'string'
    })
    lastname: string

    @property({
        type: 'string'
    })
    firstname: string

    @property({
        type: 'string',
        required: true
    })
    email: string

    @property({
        type: 'string',
        required: true
    })
    password: string

    @property({
        type: 'string',
        itemType: 'string'
    })
    role: string

    @hasOne(() => UserCredentials)
    userCredentials: UserCredentials

    constructor(data?: Partial<User>) {
        super(data)
    }
}
