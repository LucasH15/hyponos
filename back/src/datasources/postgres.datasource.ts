import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core'
import { juggler } from '@loopback/repository'

interface IConfig {
    name: string
    connector: string
    url: string
    connectionTimeout: number
    ssl: boolean | object
}

const config: IConfig = {
    name: 'postgres',
    connector: 'postgresql',
    url: process.env.DATABASE_URL ?? '', // postgres://test:mypassword@localhost:5432/dev
    connectionTimeout: 10000,
    ssl: false
}

if (process.env.DATABASE_URL === 'true') {
    config.ssl = {
        rejectUnauthorized: false
    }
}

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName = 'postgres'
    static readonly defaultConfig = config

    constructor(
        @inject('datasources.config.postgres', { optional: true })
        dsConfig: object = config
    ) {
        super(dsConfig)
    }
}
