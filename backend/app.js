import express from 'express';
import path from "path";
import cors from "cors";

// Configuracao de arquivos - necessario pro tipo ES Módules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config()

// Configuracao banco de dados
import connection from './config/db.js'

const app = express();
const port = process.env.PORT;

// Config Json nd form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Configuracao de Cors
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

// Configuracao diretorio de upload
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


// Rotas
import router from './routes/Router.js';
app.use(router);

app.listen(port, () => console.log(`Servidor rodando em ${port}`));