import { authenticate } from '@loopback/authentication'
import { authorize } from '@loopback/authorization'
import { Filter, FilterExcludingWhere, repository } from '@loopback/repository'
import { post, param, get, getModelSchemaRef, patch, put, del, requestBody, response } from '@loopback/rest'

import { ROLE_ADMIN, ROLE_MANAGER } from '../constants'
import { Room } from '../models'
import { RoomRepository } from '../repositories'
import { basicAuthorization } from '../services'

export class RoomController {
    constructor(
        @repository(RoomRepository)
        public roomRepository: RoomRepository
    ) {}

    @post('/admin/rooms')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN, ROLE_MANAGER],
        voters: [basicAuthorization]
    })
    @response(200, {
        description: 'Create a room',
        content: { 'application/json': { schema: getModelSchemaRef(Room) } }
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Room, {
                        title: 'NewRoom',
                        exclude: ['id']
                    })
                }
            }
        })
        room: Omit<Room, 'id'>
    ): Promise<Room> {
        return this.roomRepository.create(room)
    }

    @get('/rooms')
    @response(200, {
        description: 'Array of Room model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Room, { includeRelations: true })
                }
            }
        }
    })
    async find(@param.filter(Room) filter?: Filter<Room>): Promise<Room[]> {
        return this.roomRepository.find(filter)
    }

    @get('/rooms/{id}')
    @response(200, {
        description: 'Room model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Room, { includeRelations: true })
            }
        }
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(Room, { exclude: 'where' }) filter?: FilterExcludingWhere<Room>
    ): Promise<Room> {
        return this.roomRepository.findById(id, filter)
    }

    @patch('/rooms/{id}')
    @response(204, {
        description: 'Room PATCH success'
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Room, { partial: true })
                }
            }
        })
        room: Room
    ): Promise<void> {
        await this.roomRepository.updateById(id, room)
    }

    @put('/rooms/{id}')
    @response(204, {
        description: 'Room PUT success'
    })
    async replaceById(@param.path.string('id') id: string, @requestBody() room: Room): Promise<void> {
        await this.roomRepository.replaceById(id, room)
    }

    @del('/rooms/{id}')
    @response(204, {
        description: 'Room DELETE success'
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.roomRepository.deleteById(id)
    }
}
