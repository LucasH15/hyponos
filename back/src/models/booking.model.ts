import { UserWithRelations } from '@loopback/authentication-jwt'
import { belongsTo, Entity, model, property } from '@loopback/repository'

import { Room, RoomWithRelations } from './room.model'
import { User } from './user.model'

@model({
    settings: { postgresql: { schema: 'public', table: 'booking' } }
})
export class Booking extends Entity {
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
        type: 'date',
        required: true
    })
    from: string

    @property({
        type: 'date',
        required: true
    })
    to: string

    @property({
        type: 'string'
    })
    status: string

    @belongsTo(() => Room, { name: 'room' })
    roomId: string

    @belongsTo(() => User, { name: 'user' })
    userId: string

    constructor(data?: Partial<Booking>) {
        super(data)
    }
}

export interface BookingRelations {
    user: UserWithRelations
    room: RoomWithRelations
}

export type BookingWithRelations = Booking & BookingRelations
