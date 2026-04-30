import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { corsOptions } from "./config/configCors.js";

import routeAuth from "./route/routeAuth.js";
import routeJobRecord from "./route/routeJobRecord.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/auth', routeAuth);
app.use('/jobRecord', routeJobRecord)

export default app;