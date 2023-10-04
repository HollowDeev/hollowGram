import express from 'express';
import path from "path";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = process.env.PORT;

// Rotas
import router from './routes/Router.js';

app.use(router);

// Config Json nd form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.listen(port, () => console.log(`Servidor rodando em ${port}`));