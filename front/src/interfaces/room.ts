import { IHotel } from '@Interfaces/hotel'

export interface IRoom {
    id: string
    title: string
    mainPicture: string
    description?: string
    pictures?: string[]
    price: number
    nbRooms: number
    hotelId: string
}

export interface IRoomWithHotel extends IRoom {
    hotel: IHotel
}

export interface IFormInputs {
    title: string
    mainPicture: File
    description?: string
    pictures?: File[]
    price: number
    nbRooms: number
    hotelId: string
}

export interface IFormSubmitInputs {
    title: string
    mainPicture: string
    description?: string
    pictures?: string[]
    price: number
    nbRooms: number
    hotelId: string
}
