import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDataSource } from '../datasources'
import { UserHotel, UserHotelRelations } from '../models'

export class UserHotelRepository extends DefaultCrudRepository<
    UserHotel,
    typeof UserHotel.prototype.userId,
    UserHotelRelations
> {
    constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
        super(UserHotel, dataSource)
    }
}
