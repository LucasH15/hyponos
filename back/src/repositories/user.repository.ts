import { inject, Getter } from '@loopback/core'
import {
    DefaultCrudRepository,
    HasManyRepositoryFactory,
    HasManyThroughRepositoryFactory,
    HasOneRepositoryFactory,
    repository
} from '@loopback/repository'

import { PostgresDataSource } from '../datasources'
import { Booking, Hotel, User, UserCredentials, UserHotel } from '../models'
import { BookingRepository } from './booking.repository'
import { HotelRepository } from './hotel.repository'
import { UserHotelRepository } from './user-hotel.repository'
import { UserCredentialsRepository } from './user-credentials.repository'

export type Credentials = {
    email: string
    password: string
}

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
    public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>
    public readonly hotels: HasManyThroughRepositoryFactory<
        Hotel,
        typeof Hotel.prototype.id,
        UserHotel,
        typeof User.prototype.id
    >
    public readonly bookings: HasManyRepositoryFactory<Booking, typeof Booking.prototype.id>

    constructor(
        @inject('datasources.postgres')
        dataSource: PostgresDataSource,
        @repository.getter('UserCredentialsRepository')
        protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
        @repository.getter('HotelRepository')
        hotelRepositoryGetter: Getter<HotelRepository>,
        @repository.getter('UserHotelRepository')
        userHotelRepositoryGetter: Getter<UserHotelRepository>,
        @repository.getter('BookingRepository')
        bookingRepositoryGetter: Getter<BookingRepository>
    ) {
        super(User, dataSource)
        this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter)
        this.hotels = this.createHasManyThroughRepositoryFactoryFor(
            'hotels',
            hotelRepositoryGetter,
            userHotelRepositoryGetter
        )
        this.bookings = this.createHasManyRepositoryFactoryFor('bookings', bookingRepositoryGetter)

        this.registerInclusionResolver('hotels', this.hotels.inclusionResolver)
        this.registerInclusionResolver('bookings', this.bookings.inclusionResolver)
    }

    async findCredentials(userId: typeof User.prototype.id): Promise<UserCredentials | undefined> {
        try {
            return await this.userCredentials(userId).get()
        } catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined
            }
            throw err
        }
    }
}
