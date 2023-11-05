import { DataSource } from 'typeorm';
import 'dotenv/config';
console.log(111111111, process.env.PG_HOST, process.env.PG_PORT, process.env.PG_USERNAME, process.env.PG_DATABASE)
export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  // host: 'localhost',
  port: Number(process.env.PG_PORT),
  // port: 5433,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: ['./src/*/entities/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
});
