import { IRoomWithHotel } from '@Interfaces/room'
import { IUser } from '@Interfaces/user'

export interface IBooking {
    id: string
    from: Date
    to: Date
    status: string
    userId: string
    user: IUser
    roomId: string
    room: IRoomWithHotel
}

export interface IFormInputs {
    from: Date
    to: Date
    hotelId: string
    roomId: string
}
