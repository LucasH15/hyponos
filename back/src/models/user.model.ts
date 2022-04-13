import { Entity, model, property, hasOne } from '@loopback/repository'
import { UserCredentials } from './user-credentials.model'

@model({
    settings: {
        postgresql: {
            schema: 'public',
            table: 'user'
        },
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
        id: true,
        type: 'string',
        required: false,
        generated: true,
        useDefaultIdType: false,
        postgresql: {
            dataType: 'uuid',
            extension: 'pgcrypto',
            defaultFn: 'gen_random_uuid()'
        }
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
        type: 'string'
    })
    role: string

    @hasOne(() => UserCredentials)
    userCredentials: UserCredentials

    constructor(data?: Partial<User>) {
        super(data)
    }
}
