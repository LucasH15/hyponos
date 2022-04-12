import { Entity, hasMany, model, property } from '@loopback/repository'

import { Room } from './room.model'
import { UserHotel } from './user-hotel.model'
import { User } from './user.model'

@model({ settings: { strict: false } })
export class Hotel extends Entity {
    @property({
        type: 'string',
        id: true
    })
    id: string

    @property({
        type: 'string',
        required: true
    })
    name: string

    @property({
        type: 'string',
        required: true
    })
    city: string

    @property({
        type: 'string',
        required: true
    })
    country: string

    @property({
        type: 'string',
        required: true
    })
    postCode: string

    @property({
        type: 'string',
        required: true
    })
    address: string

    @property({
        type: 'string'
    })
    description?: string

    @hasMany(() => Room)
    rooms?: Room[]

    @hasMany(() => User, { through: { model: () => UserHotel } })
    users: User[];

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any

    constructor(data?: Partial<Hotel>) {
        super(data)
    }
}

export interface HotelRelations {
    // describe navigational properties here
}

export type HotelWithRelations = Hotel & HotelRelations