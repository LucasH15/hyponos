import { Entity, model, property, hasOne, hasMany } from '@loopback/repository'
import { Booking } from './booking.model'

import { UserCredentials } from './user-credentials.model'
import { UserHotel } from './user-hotel.model'
import { Hotel } from './hotel.model'

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
    lastName: string

    @property({
        type: 'string'
    })
    firstName: string

    @property({
        type: 'string',
        required: true
    })
    email: string

    @property({
        type: 'string'
    })
    role?: string

    @hasOne(() => UserCredentials)
    userCredentials: UserCredentials

    @hasMany(() => Hotel, { through: { model: () => UserHotel } })
    hotels: Hotel[]

    @hasMany(() => Booking)
    bookings?: Booking[]

    constructor(data?: Partial<User>) {
        super(data)
    }
}
