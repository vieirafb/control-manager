import express from 'express';
import Routes from "./http/routes";
import connection from "./infra/databases/connection";
import ErrorHandler from "./errors/ErrorHandler"
import cors from "cors"

connection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);
app.use(ErrorHandler);
app.listen(5002, () => console.log('Servidor iniciado na porta 5002!'));
