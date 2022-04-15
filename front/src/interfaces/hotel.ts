import { IRoom } from '@Interfaces/room'

export interface IHotel {
    id: string
    name: string
    city: string
    country: string
    postCode: string
    address: string
    description?: string
}

export interface IHotelAndRooms extends IHotel {
    rooms?: IRoom[]
}

export interface IFormInputs {
    name: string
    city: string
    country: string
    postCode: string
    address: string
    description?: string
}
