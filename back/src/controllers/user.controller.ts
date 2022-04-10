import { SecurityBindings, UserProfile, securityId } from '@loopback/security'
import _ from 'lodash'
import { inject } from '@loopback/core'
import { Count, CountSchema, FilterExcludingWhere, repository, Where } from '@loopback/repository'
import { post, param, get, getModelSchemaRef, patch, del, requestBody, response, HttpErrors } from '@loopback/rest'
import { authenticate, TokenService } from '@loopback/authentication'
import { authorize } from '@loopback/authorization'
import { TokenServiceBindings } from '@loopback/authentication-jwt'

import { ROLE_ADMIN, ROLE_USER } from '../constants'
import { User, UserWithPassword } from '../models'
import { Credentials, UserRepository } from '../repositories'
import { basicAuthorization, validateCredentials, UserManagementService } from '../services'
import { UserServiceBindings } from '../utils'
import { CredentialsRequestBody } from './specs/user-controller.specs'

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
        description: 'Create a user',
        content: { 'application/json': { schema: getModelSchemaRef(User) } }
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(UserWithPassword, {
                        title: 'NewUser',
                        exclude: ['id']
                    })
                }
            }
        })
        user: UserWithPassword
    ): Promise<User> {
        user.role = ROLE_USER

        validateCredentials(_.pick(user, ['email', 'password']))

        try {
            return await this.userManagementService.createUser(user)
        } catch (error) {
            if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
                throw new HttpErrors.Conflict('Cette adresse email existe déjà')
            } else {
                throw error
            }
        }
    }

    @post('/users/login')
    @response(200, {
        description: 'Login a user',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: { token: { type: 'string' } }
                }
            }
        }
    })
    async login(@requestBody(CredentialsRequestBody) credentials: Credentials): Promise<{ token: string }> {
        const user = await this.userManagementService.verifyCredentials(credentials)
        const userProfile = this.userManagementService.convertToUserProfile(user)
        const token = await this.jwtService.generateToken(userProfile)

        return { token }
    }

    @post('/admin/users')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN],
        voters: [basicAuthorization]
    })
    @response(200, {
        description: 'Create a user from admin panel',
        content: { 'application/json': { schema: getModelSchemaRef(User) } }
    })
    async add(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {
                        title: 'NewUserWithoutPassword',
                        exclude: ['id']
                    })
                }
            }
        })
        user: User
    ): Promise<User> {
        const userInDb = await this.userRepository.findOne({ where: { email: user.email } })

        if (userInDb) {
            throw new HttpErrors.Conflict('Cet utilisateur existe déjà')
        }

        const userWithPassword: UserWithPassword = _.merge(user, { password: 'Test1234!' }) // TODO create default password and send create password by email

        validateCredentials(_.pick(userWithPassword, ['email', 'password']))

        try {
            return await this.userManagementService.createUser(userWithPassword)
        } catch (error) {
            if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
                throw new HttpErrors.Conflict('Cette adresse email existe déjà')
            } else {
                throw error
            }
        }
    }

    @get('/users/me')
    @authenticate('jwt')
    @response(200, {
        description: 'The current user profile',
        content: {
            'application/json': {
                schema: User
            }
        }
    })
    async getCurrentUser(
        @inject(SecurityBindings.USER)
        currentUserProfile: UserProfile
    ): Promise<User> {
        const userId = currentUserProfile[securityId]

        return this.userRepository.findById(userId)
    }

    @get('/admin/users')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN],
        voters: [basicAuthorization]
    })
    @response(200, {
        description: 'All users from db',
        content: {
            'application/json': {
                schema: User
            }
        }
    })
    async find(): Promise<User[]> {
        return this.userRepository.find()
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

    @patch('/admin/users/{id}')
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
        const currentUser = await this.userRepository.findById(id)

        if (currentUser.role === ROLE_ADMIN) {
            const usersAdmin = await this.userRepository.find({ where: { role: ROLE_ADMIN } })

            if (usersAdmin.length === 1) {
                throw new HttpErrors.Unauthorized('Vous ne pouvez pas supprimer le seul admin qui existe')
            }
        }
        await this.userRepository.updateById(id, user)
    }

    @del('/admin/users/{id}')
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN],
        voters: [basicAuthorization]
    })
    @response(204, {
        description: 'User DELETE success'
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        const currentUser = await this.userRepository.findById(id)

        if (currentUser.role === ROLE_ADMIN) {
            const usersAdmin = await this.userRepository.find({ where: { role: ROLE_ADMIN } })

            if (usersAdmin.length === 1) {
                throw new HttpErrors.Unauthorized('Vous ne pouvez pas supprimer le seul admin qui existe')
            }
        }

        await this.userRepository.deleteById(id)
    }
}
