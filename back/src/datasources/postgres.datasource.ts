import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core'
import { juggler } from '@loopback/repository'

const config = {
    name: 'postgres',
    connector: 'postgresql',
    url: 'postgresql://lucash@localhost/hyponos',
    host: 'localhost',
    port: 5432,
    user: 'lucash',
    password: '',
    database: 'hyponos'
}

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresDatasource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName = 'postgres'
    static readonly defaultConfig = config

    constructor(
        @inject('datasources.config.postgres', { optional: true })
        dsConfig: object = config
    ) {
        super(dsConfig)
    }
}