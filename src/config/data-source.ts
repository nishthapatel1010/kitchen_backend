import "reflect-metadata";
import { DataSource } from "typeorm";
import { Level } from "../entities/Level";
import { KitchenCategory } from "../entities/KitchenCategory";
import { Admin } from "../entities/Admin";
import { KitchenItem } from "../entities/KitchenItem";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5430,
  username: "postgres",        
  password: "freshcode",   
  database: "kitchen_db",      
  synchronize: true,
  logging: true,
  entities: [Level, KitchenCategory, Admin, KitchenItem],
});
