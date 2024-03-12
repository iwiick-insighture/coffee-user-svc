import { DataSource } from "typeorm";
import configData from "./config";

export const dataSource = new DataSource({
  type: "postgres",
  host: configData.postgres.host,
  port: configData.postgres.port,
  username: configData.postgres.username,
  password: configData.postgres.password,
  database: configData.postgres.database,
  entities: ["src/entities/*.ts"], 
  synchronize: true,
});
