import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { HyponosDataSource } from '../datasources'
import { Room, RoomRelations } from '../models'

export class RoomRepository extends DefaultCrudRepository<Room, typeof Room.prototype.id, RoomRelations> {
    constructor(@inject('datasources.mongo') dataSource: HyponosDataSource) {
        super(Room, dataSource)
    }
}