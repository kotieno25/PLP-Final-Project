module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    migrationsDir: "src/migrations"
  },
  synchronize: false,
  logging: true
};