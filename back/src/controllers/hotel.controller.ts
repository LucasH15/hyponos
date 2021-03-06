import { authenticate } from '@loopback/authentication'
import { authorize } from '@loopback/authorization'
import { Filter, repository } from '@loopback/repository'
import { post, param, get, getModelSchemaRef, patch, del, requestBody, response } from '@loopback/rest'

import { ROLE_ADMIN, ROLE_MANAGER } from '../constants'
import { Hotel } from '../models'
import { HotelRepository } from '../repositories'
import { basicAuthorization } from '../services'

export class HotelController {
    constructor(
        @repository(HotelRepository)
        public hotelRepository: HotelRepository
    ) {}

    @post('/admin/hotels')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN],
        voters: [basicAuthorization]
    })
    @response(200, {
        description: 'Create a hotel',
        content: { 'application/json': { schema: getModelSchemaRef(Hotel) } }
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Hotel, {
                        title: 'NewHotel',
                        exclude: ['id']
                    })
                }
            }
        })
        hotel: Omit<Hotel, 'id'>
    ): Promise<Hotel> {
        return this.hotelRepository.create(hotel)
    }

    @get('/hotels')
    @response(200, {
        description: 'All hotels from db',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Hotel, { includeRelations: true })
                }
            }
        }
    })
    async find(@param.filter(Hotel) filter?: Filter<Hotel>): Promise<Hotel[]> {
        return this.hotelRepository.find(filter)
    }

    @get('/hotels/{id}')
    @response(200, {
        description: 'Hotel model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Hotel, { includeRelations: true })
            }
        }
    })
    async findById(@param.path.string('id') id: string): Promise<Hotel> {
        return this.hotelRepository.findById(id, { include: ['rooms'] })
    }

    @patch('/admin/hotels/{id}')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN, ROLE_MANAGER],
        voters: [basicAuthorization]
    })
    @response(204, {
        description: 'Hotel PATCH success'
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Hotel, { partial: true })
                }
            }
        })
        hotel: Hotel
    ): Promise<void> {
        await this.hotelRepository.updateById(id, hotel)
    }

    @del('/admin/hotels/{id}')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN],
        voters: [basicAuthorization]
    })
    @response(204, {
        description: 'Hotel DELETE success'
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.hotelRepository.deleteById(id)
    }
}
