import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'hyponos',
  connector: 'mongodb',
  host: process.env.DB_HOST,
  port: 27017,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  useNewUrlParser: true,
  protocol: 'mongodb+srv'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class HyponosDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'hyponos';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.hyponos', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
