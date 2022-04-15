import { IHotel } from '@Interfaces/hotel'

export interface IUser {
    id: string
    email: string
    password: string
    role: string
    firstName?: string
    lastName?: string
    hotels?: IHotel[]
}
