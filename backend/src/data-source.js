"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const Fund_1 = require("./models/Fund");
const FundPerformance_1 = require("./models/FundPerformance");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Fund_1.Fund, FundPerformance_1.FundPerformance],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: true,
});
