import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const { DB_URL, NODE_ENV } = process.env;

const options = {
  connectionString: DB_URL,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

const connection = new Pool(options);

export default connection;
