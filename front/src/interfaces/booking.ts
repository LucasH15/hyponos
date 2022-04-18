import { IRoom } from '@Interfaces/room'
import { IUser } from '@Interfaces/user'

export interface IBooking {
    id: string
    from: Date
    to: Date
    userId: string
    user: IUser
    roomId: string
    room: IRoom
}

export interface IFormInputs {
    from: Date
    to: Date
    hotelId: string
    roomId: string
}
