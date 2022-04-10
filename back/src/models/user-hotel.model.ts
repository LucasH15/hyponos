import { Entity, model, property } from '@loopback/repository'

@model()
export class UserHotel extends Entity {
    @property({
        type: 'string',
        id: true
    })
    userId: string

    @property({
        type: 'string',
        id: true
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
