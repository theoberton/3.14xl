// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from './swagger/openapi.json';

import express, { Express, Request, Response } from "express";
import cors from "cors";
import { useExpressServer } from "routing-controllers";
import { UserController } from "./controller/user-controller";
import httpContext from "express-http-context";

import dotenv from "dotenv";
import log4js from "log4js";
import bodyParser from "body-parser";
import { GlobalErrorHandler } from "./middleware/global-error-handler";
import { RequestHandler } from "express-serve-static-core";
import config from "config";
import telegramBot from "@/bot";

dotenv.config();

const port = config.get("PORT");
const app: Express = express();

telegramBot.configure();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors() as RequestHandler);
app.use(bodyParser.json());
app.use(httpContext.middleware);

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL!;

logger.info("log4js log info");
logger.debug("log4js log debug");
// logger.error('log4js log error');

useExpressServer(app, {
  controllers: [UserController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false,
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server - OK");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
