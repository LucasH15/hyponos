import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDatasource } from '../datasources'
import { Hotel, HotelRelations } from '../models'

export class HotelRepository extends DefaultCrudRepository<Hotel, typeof Hotel.prototype.id, HotelRelations> {
    constructor(@inject('datasources.postgres') dataSource: PostgresDatasource) {
        super(Hotel, dataSource)
    }
}
