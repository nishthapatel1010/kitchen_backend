import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

// If DATABASE_URL exists → production (Render)
// Else → use local values
const isProduction = !!process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres",

  // Use DATABASE_URL on Render, normal config locally
  url: isProduction ? process.env.DATABASE_URL : undefined,

  host: isProduction ? undefined : process.env.DB_HOST,
  port: isProduction ? undefined : Number(process.env.DB_PORT),
  username: isProduction ? undefined : process.env.DB_USER,
  password: isProduction ? undefined : process.env.DB_PASS,
  database: isProduction ? undefined : process.env.DB_NAME,

  synchronize: false,
  logging: false,

  // Entities for dev (ts) & production (js)
  entities: isProduction
    ? ["dist/entities/*.js"]
    : ["src/entities/*.ts"],

     migrations: isProduction
    ? ["dist/migration/*.js"]
    : ["src/migration/*.ts"],

  // Required by Render PostgreSQL
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

