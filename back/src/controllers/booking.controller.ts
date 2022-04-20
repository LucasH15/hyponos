import { authenticate, TokenService } from '@loopback/authentication'
import { TokenServiceBindings } from '@loopback/authentication-jwt'
import { inject } from '@loopback/core'
import { Filter, repository } from '@loopback/repository'
import {
    post,
    param,
    get,
    getModelSchemaRef,
    requestBody,
    response,
    HttpErrors,
    RestBindings,
    Request
} from '@loopback/rest'
import _ from 'lodash'
import { add, isAfter } from 'date-fns'

import { Booking } from '../models'
import { BookingRepository, RoomRepository } from '../repositories'
import { CancelRequestBody } from './specs/booking.specs'

export class BookingController {
    constructor(
        @repository(BookingRepository)
        public bookingRepository: BookingRepository,
        @repository(RoomRepository)
        public roomRepository: RoomRepository,
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(RestBindings.Http.REQUEST)
        private request: Request
    ) {}

    @post('/bookings')
    @response(200, {
        description: 'Booking model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Booking) } }
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Booking, {
                        title: 'NewBooking',
                        exclude: ['id']
                    })
                }
            }
        })
        booking: Omit<Booking, 'id'>
    ): Promise<Booking | null> {
        const { from, to, roomId } = booking
        const available = await this.check(new Date(from), new Date(to), roomId)

        if (available) {
            return this.bookingRepository.create({ ...booking, status: 'accepted' })
        } else {
            return null
        }
    }

    @get('/bookings')
    @response(200, {
        description: 'Array of Booking model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Booking, { includeRelations: true })
                }
            }
        }
    })
    async find(@param.filter(Booking) filter?: Filter<Booking>): Promise<Booking[]> {
        return this.bookingRepository.find(filter)
    }

    @get('/bookings/check')
    async check(
        @param.query.string('from') from: Date,
        @param.query.string('to') to: Date,
        @param.query.string('roomId') roomId: string
    ): Promise<boolean> {
        const room = await this.roomRepository.findById(roomId)
        const nbRooms = room.nbRooms
        // TODO search with from and to
        const bookings = await this.bookingRepository.find({ where: { roomId: roomId } })
        console.log(room)
        console.log(nbRooms)
        console.log(bookings)
        return true
    }

    @post('/bookings/cancel')
    @authenticate('jwt')
    @response(200, {
        description: 'Booking model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Booking) } }
    })
    async cancel(
        @requestBody(CancelRequestBody)
        body: {
            bookingId: string
        }
    ): Promise<void> {
        const token = _.get(this.request.headers, 'authorization') as string | undefined

        if (token) {
            const user = await this.jwtService.verifyToken(token.replace('Bearer ', ''))
            const booking = await this.bookingRepository.findOne({ where: { userId: user.id, id: body.bookingId } })

            if (booking && isAfter(new Date(booking.from), add(new Date(), { days: 2 }))) {
                await this.bookingRepository.updateById(body.bookingId, { status: 'cancelled' })
            } else {
                throw new HttpErrors.Unauthorized()
            }
        } else {
            throw new HttpErrors.Unauthorized()
        }
    }
}
