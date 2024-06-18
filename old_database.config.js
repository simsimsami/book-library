import pg from 'pg';

const { Client, Pool } = pg;
import * as dotenv from 'dotenv';
dotenv.config({});

const DB_USER = String(process.env.DB_USER);
const DB_PASSWORD = String(process.env.DB_PASSWORD);
const DB_HOST = String(process.env.DB_HOST);
const DB_DATABASE = String(process.env.DB_DATABASE);
const DB_PORT = String(process.env.DB_PORT);

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
  port: DB_PORT,
});

module.exports = {
  development: {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: 'app_development',
    port: DB_PORT,
  },
  //   test: {
  //     user: 'root',
  //     password: null,
  //     host: DB_HOST,
  //     database: 'app_test',
  //     port: DB_PORT,
  //   },
  //   production: {
  //     user: 'root',
  //     password: null,
  //     host: DB_HOST,
  //     database: 'app_production',
  //     port: DB_PORT,
  //   },
};

// Ideally, in this file we can setup multiple objects.
/*
test and production. They will be ready when this file is ready 
to be deployed.
*/

// -----> this needs to be out of comments for the project to work, for now
// export default pool;
