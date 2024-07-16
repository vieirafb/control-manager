import express from 'express';
import Routes from "./routes";
import database from "./config/database";
import ErrorHandler from "./common/errors/ErrorHandler"
import cors from "cors"

database();

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);
app.use(ErrorHandler);
app.listen(5002, () => console.log(`Servidor iniciado na porta ${process.env.API_PORT}!`));
