require('dotenv').config()
import crypto from 'crypto'
import { BootMixin } from '@loopback/boot'
import { ApplicationConfig, BindingKey, createBindingFromClass } from '@loopback/core'
import { RestExplorerBindings, RestExplorerComponent } from '@loopback/rest-explorer'
import { RepositoryMixin, SchemaMigrationOptions } from '@loopback/repository'
import { RestApplication } from '@loopback/rest'
import { ServiceMixin } from '@loopback/service-proxy'
import path from 'path'
import fs from 'fs'
import YAML from 'yaml'
import { AuthenticationComponent } from '@loopback/authentication'
import { JWTAuthenticationComponent, TokenServiceBindings } from '@loopback/authentication-jwt'
import { AuthorizationComponent } from '@loopback/authorization'

import { Hotel, Room, UserWithPassword } from './models'
import { UserRepository, HotelRepository, RoomRepository } from './repositories'
import { MAILER_SERVICE, PasswordHasherBindings, UserServiceBindings } from './utils/keys'
import { MySequence } from './sequence'
import { BcryptHasher, JWTService, UserManagementService, SecuritySpecEnhancer, MailerService } from './services'

export interface PackageInfo {
    name: string
    version: string
    description: string
}
export const PackageKey = BindingKey.create<PackageInfo>('application.package')

const pkg: PackageInfo = require('../package.json')

export class HyponosApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
    constructor(options: ApplicationConfig = {}) {
        super(options)

        this.component(AuthenticationComponent)
        this.component(JWTAuthenticationComponent)
        this.component(AuthorizationComponent)

        this.setUpBindings()

        // Set up the custom sequence
        this.sequence(MySequence)

        // Set up default home page
        this.static('/', path.join(__dirname, '../public'))
        this.static('/files', path.join(__dirname, '../files'))

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/explorer'
        })
        this.component(RestExplorerComponent)

        this.projectRoot = __dirname
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true
            }
        }
    }

    setUpBindings(): void {
        // Bind package.json to the application context
        this.bind(PackageKey).to(pkg)

        // Bind bcrypt hash services
        this.bind(PasswordHasherBindings.ROUNDS).to(10)
        this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher)
        this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService)

        this.bind(UserServiceBindings.USER_SERVICE).toClass(UserManagementService)
        this.add(createBindingFromClass(SecuritySpecEnhancer))

        // Use JWT secret from JWT_SECRET environment variable if set
        // otherwise create a random string of 64 hex digits
        const secret = process.env.JWT_SECRET ?? crypto.randomBytes(32).toString('hex')
        this.bind(TokenServiceBindings.TOKEN_SECRET).to(secret)

        this.bind(MAILER_SERVICE).toClass(MailerService)
    }

    async migrateSchema(options?: SchemaMigrationOptions) {
        await super.migrateSchema(options)

        const userRepository = await this.getRepository(UserRepository)
        const foundUser = await userRepository.findOne({ where: { email: 'hubertlucas41@gmail.com' } })

        if (!foundUser) {
            const usersDir = path.join(__dirname, '../fixtures/users')
            const userFiles = fs.readdirSync(usersDir)

            for (const file of userFiles) {
                if (file.endsWith('.yml')) {
                    const userFile = path.join(usersDir, file)
                    const yamlString = YAML.parse(fs.readFileSync(userFile, 'utf8'))
                    const userWithPassword = new UserWithPassword(yamlString)
                    const userManagementService = await this.get<UserManagementService>(
                        UserServiceBindings.USER_SERVICE
                    )
                    await userManagementService.createUser(userWithPassword)
                }
            }

            const hotelRepository = await this.getRepository(HotelRepository)
            const hotelsDir = path.join(__dirname, '../fixtures/hotels')
            const hotelFiles = fs.readdirSync(hotelsDir)
            const newHotels = []

            for (const file of hotelFiles) {
                if (file.endsWith('.yml')) {
                    const hotelFile = path.join(hotelsDir, file)
                    const yamlString = YAML.parse(fs.readFileSync(hotelFile, 'utf8'))
                    const hotel = new Hotel(yamlString)
                    const newHotel = await hotelRepository.create(hotel)
                    newHotels.push(newHotel.id)
                }
            }

            const roomRepository = await this.getRepository(RoomRepository)
            const roomsDir = path.join(__dirname, '../fixtures/rooms')
            const roomFiles = fs.readdirSync(roomsDir)

            for (const file of roomFiles) {
                if (file.endsWith('.yml')) {
                    const roomFile = path.join(roomsDir, file)
                    const yamlString = YAML.parse(fs.readFileSync(roomFile, 'utf8'))
                    const hotelId = newHotels[parseInt(file.substring(0, 2))]
                    const room = new Room({ ...yamlString, hotelId })
                    await roomRepository.create(room)
                }
            }
        }
    }
}
