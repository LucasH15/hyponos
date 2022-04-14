import { Entity, model, property } from '@loopback/repository'

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
        type: 'array',
        itemType: 'string'
    })
    pictures?: string[]

    @property({
        type: 'string',
        required: true
    })
    hotelId: string;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any

    constructor(data?: Partial<Room>) {
        super(data)
    }
}

export interface RoomRelations {
    // describe navigational properties here
}

export type RoomWithRelations = Room & RoomRelations
