import { Getter, inject } from '@loopback/core'
import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository'

import { PostgresDataSource } from '../datasources'
import { Booking, BookingRelations, Room, User } from '../models'
import { RoomRepository } from './room.repository'
import { UserRepository } from './user.repository'

export class BookingRepository extends DefaultCrudRepository<Booking, typeof Booking.prototype.id, BookingRelations> {
    public readonly room: BelongsToAccessor<Room, typeof Room.prototype.id>
    public readonly user: BelongsToAccessor<User, typeof User.prototype.id>

    constructor(
        @inject('datasources.postgres')
        dataSource: PostgresDataSource,
        @repository.getter('RoomRepository')
        roomRepositoryGetter: Getter<RoomRepository>,
        @repository.getter('UserRepository')
        userRepositoryGetter: Getter<UserRepository>
    ) {
        super(Booking, dataSource)

        this.room = this.createBelongsToAccessorFor('room', roomRepositoryGetter)
        this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter)

        this.registerInclusionResolver('room', this.room.inclusionResolver)
        this.registerInclusionResolver('user', this.user.inclusionResolver)
    }
}
