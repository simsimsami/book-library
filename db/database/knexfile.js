// Update with your config settings.
import config from './config';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'pg',
    connection: {
      database: config.DB_DATABASE,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      port: config.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
