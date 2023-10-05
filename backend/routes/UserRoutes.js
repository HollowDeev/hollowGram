import express from 'express';
const router = express();

// controller
import {register, login, pegarDadosUsuarios, update, buscarPorId} from '../controllers/UserController.js';

// middlewares
import {handleValidation} from "../middlewares/handleValidation.js";
import {validacaoCadastro, validacaoLogin, validacaoUpdate} from "../middlewares/userValidation.js";
import {authMiddleware} from "../middlewares/authMiddlewares.js";
import uploadImagem from "../middlewares/imageUploadMiddleware.js";


router.post('/registrar', validacaoCadastro(), handleValidation, register);

router.post('/login', validacaoLogin(), handleValidation, login)

router.get("/perfil", authMiddleware, pegarDadosUsuarios);

router.put("/", authMiddleware, validacaoUpdate(), handleValidation,
    uploadImagem.single("profileImage"), update);

router.get("/:id", authMiddleware, buscarPorId)


export default router;