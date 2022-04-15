import { Entity, model, property } from '@loopback/repository'

@model({
    settings: { postgresql: { schema: 'public', table: 'userCredentials' } }
})
export class UserCredentials extends Entity {
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
        type: 'string',
        required: true
    })
    password: string

    @property({
        type: 'string',
        required: true,
        postgresql: {
            dataType: 'uuid'
        }
    })
    userId: string

    constructor(data?: Partial<UserCredentials>) {
        super(data)
    }
}

export interface UserCredentialsRelations {
    // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials & UserCredentialsRelations
