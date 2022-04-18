import { belongsTo, Entity, model, property } from '@loopback/repository'

import { Hotel, HotelWithRelations } from './hotel.model'

@model({
    settings: { postgresql: { schema: 'public', table: 'room' } }
})
export class Room extends Entity {
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
    title: string

    @property({
        type: 'string',
        required: true
    })
    mainPicture: string

    @property({
        type: 'string'
    })
    description?: string

    @property({
        type: 'number',
        required: true
    })
    price: number

    @property({
        type: 'number',
        required: true
    })
    nbRooms: number

    @property({
        type: 'array',
        itemType: 'string'
    })
    pictures?: string[]

    @belongsTo(() => Hotel, { name: 'hotel' })
    hotelId: string

    constructor(data?: Partial<Room>) {
        super(data)
    }
}

export interface RoomRelations {
    hotel: HotelWithRelations
}

export type RoomWithRelations = Room & RoomRelations
