import express from 'express';
import Routes from "./http/routes";
import connection from "./infra/databases/connection";
import {errors} from "celebrate";

connection();

const app = express();

app.use(express.json());
app.use(Routes);
app.use(errors());
app.listen(5002, () => console.log('Servidor iniciado na porta 5002!'));
