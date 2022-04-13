import { Entity, model, property } from '@loopback/repository'

@model({
    settings: { postgresql: { schema: 'public', table: 'userHotel' } }
})
export class UserHotel extends Entity {
    @property({
        type: 'string',
        id: true,
        postgresql: {
            dataType: 'uuid'
        }
    })
    userId: string

    @property({
        type: 'string',
        id: true,
        postgresql: {
            dataType: 'uuid'
        }
    })
    hotelId: string

    constructor(data?: Partial<UserHotel>) {
        super(data)
    }
}

export interface UserHotelRelations {
    // describe navigational properties here
}

export type UserHotelWithRelations = UserHotel & UserHotelRelations
