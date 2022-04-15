import { Getter, inject } from '@loopback/core'
import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository'

import { PostgresDataSource } from '../datasources'
import { Hotel, HotelRelations, Room } from '../models'
import { RoomRepository } from './room.repository'

export class HotelRepository extends DefaultCrudRepository<Hotel, typeof Hotel.prototype.id, HotelRelations> {
    public readonly rooms: HasManyRepositoryFactory<Room, typeof Room.prototype.id>

    constructor(
        @inject('datasources.postgres')
        dataSource: PostgresDataSource,
        @repository.getter('RoomRepository')
        roomRepositoryGetter: Getter<RoomRepository>
    ) {
        super(Hotel, dataSource)

        this.rooms = this.createHasManyRepositoryFactoryFor('rooms', roomRepositoryGetter)

        this.registerInclusionResolver('rooms', this.rooms.inclusionResolver)
    }
}
