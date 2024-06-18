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

export default {
  pool,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  DB_PORT,
};
