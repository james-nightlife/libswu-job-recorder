
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import cors from "cors";
import { corsOptions } from "./src/config/configCors.js";
import start from "./src/app.js";




const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

console.log('PORT:', process.env.PORT)

const PORT = process.env.PORT || 3000;

start(app, PORT);