import { Getter, inject } from '@loopback/core'
import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository'

import { PostgresDataSource } from '../datasources'
import { Hotel, Room, RoomRelations } from '../models'
import { HotelRepository } from './hotel.repository'

export class RoomRepository extends DefaultCrudRepository<Room, typeof Room.prototype.id, RoomRelations> {
    public readonly hotel: BelongsToAccessor<Hotel, typeof Hotel.prototype.id>

    constructor(
        @inject('datasources.postgres')
        dataSource: PostgresDataSource,
        @repository.getter('HotelRepository')
        hotelRepositoryGetter: Getter<HotelRepository>
    ) {
        super(Room, dataSource)

        this.hotel = this.createBelongsToAccessorFor('hotel', hotelRepositoryGetter)

        this.registerInclusionResolver('hotel', this.hotel.inclusionResolver)
    }
}
