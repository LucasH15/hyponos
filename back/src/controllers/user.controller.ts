import _ from 'lodash'
import { inject } from '@loopback/core'
import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    repository,
    Where
} from '@loopback/repository'
import {
    post,
    param,
    get,
    getModelSchemaRef,
    patch,
    put,
    del,
    requestBody,
    response,
    HttpErrors
} from '@loopback/rest'
import { authenticate, TokenService } from '@loopback/authentication'
import { authorize } from '@loopback/authorization'
import { TokenServiceBindings } from '@loopback/authentication-jwt'

import { ROLE_ADMIN, ROLE_USER } from '../constants'
import { User } from '../models'
import { UserRepository } from '../repositories'
import {
    basicAuthorization,
    validateCredentials,
    UserManagementService
} from '../services'
import { UserServiceBindings } from '../utils'

export class UserController {
    constructor(
        @repository(UserRepository)
        public userRepository: UserRepository,
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE)
        public userManagementService: UserManagementService
    ) {}

    @post('/users')
    @response(200, {
        description: 'User model instance',
        content: { 'application/json': { schema: getModelSchemaRef(User) } }
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {
                        title: 'NewUser',
                        exclude: ['id']
                    })
                }
            }
        })
        user: User
    ): Promise<User> {
        user.role = ROLE_USER

        validateCredentials(_.pick(user, ['email', 'password']))

        try {
            return await this.userManagementService.createUser(user)
        } catch (error) {
            if (
                error.code === 11000 &&
                error.errmsg.includes('index: uniqueEmail')
            ) {
                throw new HttpErrors.Conflict('Cette adresse email existe déjà')
            } else {
                throw error
            }
        }
    }

    @get('/users')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN],
        voters: [basicAuthorization]
    })
    @response(200, {
        description: 'Array of User model instances',
        content: {
            'application/json': {
                schema: User
            }
        }
    })
    async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
        return this.userRepository.find(filter)
    }

    @patch('/users')
    @response(200, {
        description: 'User PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, { partial: true })
                }
            }
        })
        user: User,
        @param.where(User) where?: Where<User>
    ): Promise<Count> {
        return this.userRepository.updateAll(user, where)
    }

    @get('/users/{id}')
    @response(200, {
        description: 'User model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(User, { includeRelations: true })
            }
        }
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(User, { exclude: 'where' })
        filter?: FilterExcludingWhere<User>
    ): Promise<User> {
        return this.userRepository.findById(id, filter)
    }

    @patch('/users/{id}')
    @response(204, {
        description: 'User PATCH success'
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, { partial: true })
                }
            }
        })
        user: User
    ): Promise<void> {
        await this.userRepository.updateById(id, user)
    }

    @put('/users/{id}')
    @response(204, {
        description: 'User PUT success'
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() user: User
    ): Promise<void> {
        await this.userRepository.replaceById(id, user)
    }

    @del('/users/{id}')
    @response(204, {
        description: 'User DELETE success'
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.userRepository.deleteById(id)
    }
}
