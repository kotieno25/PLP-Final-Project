import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Fund } from "./models/Fund";
import { FundPerformance } from "./models/FundPerformance";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Fund, FundPerformance],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
  logging: true,
});