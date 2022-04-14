import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDataSource } from '../datasources'
import { Hotel, HotelRelations } from '../models'

export class HotelRepository extends DefaultCrudRepository<Hotel, typeof Hotel.prototype.id, HotelRelations> {
    constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
        super(Hotel, dataSource)
    }
}
