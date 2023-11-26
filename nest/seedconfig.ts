import { DataSource } from 'typeorm';
import 'dotenv/config';

const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  // host: 'localhost',
  port: Number(process.env.PG_PORT),
  // port: 5433,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: ['./src/*/entities/*.entity.ts'],
  migrations: ['.src/seeds/*.ts'],
  synchronize: false,
});

export default connectionSource;
