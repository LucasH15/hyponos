import { Entity, hasMany, model, property } from '@loopback/repository'

import { Room } from './room.model'

@model({
    settings: { postgresql: { schema: 'public', table: 'hotel' } }
})
export class Hotel extends Entity {
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
    name: string

    @property({
        type: 'string',
        required: true
    })
    mainPicture: string

    @property({
        type: 'array',
        itemType: 'string'
    })
    pictures?: string[]

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
        type: 'string'
    })
    postCode?: string

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
    rooms?: Room[];

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
