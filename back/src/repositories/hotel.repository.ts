import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { HyponosDataSource } from '../datasources'
import { Hotel, HotelRelations } from '../models'

export class HotelRepository extends DefaultCrudRepository<Hotel, typeof Hotel.prototype.id, HotelRelations> {
    constructor(@inject('datasources.mongo') dataSource: HyponosDataSource) {
        super(Hotel, dataSource)
    }
}
