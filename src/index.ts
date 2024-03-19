import express from "express";
import configData from "./configs/config";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import { dataSource } from "./configs/db";

dataSource
  .initialize()
  .then(() => {
    console.log("DB Connected and Initiallized");
    const app = express();
    app.use(express.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
    app.use(cors());
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use(router);

    app.listen(configData.port, () => {
      console.log(`coffee-user-svc started on port :: ${configData.port}`);
    });
  })
  .catch((err) => {
    console.error("Error Initializing DB", err);
  });
