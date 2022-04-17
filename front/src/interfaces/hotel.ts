import { IRoom } from '@Interfaces/room'

export interface IHotel {
    id: string
    name: string
    mainPicture: string
    pictures?: string[]
    city: string
    country: string
    postCode?: string
    address: string
    description?: string
}

export interface IHotelAndRooms extends IHotel {
    rooms?: IRoom[]
}

export interface IFormInputs {
    name: string
    mainPicture: File
    pictures?: File[]
    city: string
    country: string
    postCode?: string
    address: string
    description?: string
}
