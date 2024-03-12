import { readFileSync } from "fs";
import { join } from "path";

interface Config {
  port: number;
  postgres: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    synchronize: boolean;
    migrationRuns: boolean;
  };
  encryptionKey: string;
}

const configFile = join(process.cwd(), "./config.json");
const configData: Config = JSON.parse(readFileSync(configFile, "utf-8"));
export default configData;
