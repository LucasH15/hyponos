import { authenticate, TokenService } from '@loopback/authentication'
import { TokenServiceBindings } from '@loopback/authentication-jwt'
import { authorize } from '@loopback/authorization'
import { inject } from '@loopback/core'
import { repository } from '@loopback/repository'
import {
    del,
    get,
    getModelSchemaRef,
    HttpErrors,
    param,
    post,
    Request,
    requestBody,
    response,
    RestBindings
} from '@loopback/rest'
import _ from 'lodash'

import { ROLE_ADMIN, ROLE_MANAGER, UNIQUE_VIOLATION } from '../constants'
import { UserHotel } from '../models'
import { UserHotelRepository } from '../repositories'
import { basicAuthorization } from '../services'

export class UserHotelController {
    constructor(
        @repository(UserHotelRepository)
        public userHotelRepository: UserHotelRepository,
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(RestBindings.Http.REQUEST)
        private request: Request
    ) {}

    @post('/admin/user-hotels')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN],
        voters: [basicAuthorization]
    })
    @response(200, {
        description: 'Add relation between user and hotel'
    })
    async add(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(UserHotel, {
                        title: 'NewUserHotel'
                    })
                }
            }
        })
        userHotel: UserHotel
    ): Promise<void> {
        try {
            await this.userHotelRepository.create(userHotel)
        } catch (error) {
            if (error.code === UNIQUE_VIOLATION) {
                throw new HttpErrors.Conflict('Cet utilisateur est déjà assigné à cet hôtel')
            } else {
                throw error
            }
        }
    }

    @get('/admin/user-hotels')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN, ROLE_MANAGER],
        voters: [basicAuthorization]
    })
    @response(200, {
        description: 'Array of UserHotel model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(UserHotel, { includeRelations: true })
                }
            }
        }
    })
    async find(): Promise<UserHotel[]> {
        const token = _.get(this.request.headers, 'authorization') as string | undefined

        if (token) {
            const user = await this.jwtService.verifyToken(token.replace('Bearer ', ''))
            return this.userHotelRepository.find({ where: { userId: user.id } })
        }

        throw new HttpErrors.Unauthorized()
    }

    @del('/admin/user-hotels')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN],
        voters: [basicAuthorization]
    })
    @response(204, {
        description: 'Room DELETE success'
    })
    async delete(
        @param.query.string('userId') userId: string,
        @param.query.string('hotelId') hotelId: string
    ): Promise<void> {
        await this.userHotelRepository.deleteAll({ userId, hotelId })
    }
}
