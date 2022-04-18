import { Count, CountSchema, Filter, FilterExcludingWhere, repository, Where } from '@loopback/repository'
import { post, param, get, getModelSchemaRef, patch, put, del, requestBody, response } from '@loopback/rest'

import { Booking } from '../models'
import { BookingRepository, RoomRepository } from '../repositories'

export class BookingController {
    constructor(
        @repository(BookingRepository)
        public bookingRepository: BookingRepository,
        @repository(RoomRepository)
        public roomRepository: RoomRepository
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
            return this.bookingRepository.create(booking)
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

    @patch('/bookings')
    @response(200, {
        description: 'Booking PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Booking, { partial: true })
                }
            }
        })
        booking: Booking,
        @param.where(Booking) where?: Where<Booking>
    ): Promise<Count> {
        return this.bookingRepository.updateAll(booking, where)
    }

    @get('/bookings/{id}')
    @response(200, {
        description: 'Booking model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Booking, { includeRelations: true })
            }
        }
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(Booking, { exclude: 'where' }) filter?: FilterExcludingWhere<Booking>
    ): Promise<Booking> {
        return this.bookingRepository.findById(id, filter)
    }

    @patch('/bookings/{id}')
    @response(204, {
        description: 'Booking PATCH success'
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Booking, { partial: true })
                }
            }
        })
        booking: Booking
    ): Promise<void> {
        await this.bookingRepository.updateById(id, booking)
    }

    @put('/bookings/{id}')
    @response(204, {
        description: 'Booking PUT success'
    })
    async replaceById(@param.path.string('id') id: string, @requestBody() booking: Booking): Promise<void> {
        await this.bookingRepository.replaceById(id, booking)
    }

    @del('/bookings/{id}')
    @response(204, {
        description: 'Booking DELETE success'
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.bookingRepository.deleteById(id)
    }
}
