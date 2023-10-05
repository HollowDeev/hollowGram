import express from 'express';
const router = express();

// controller
import {register, login} from '../controllers/UserController.js';

// middlewares
import {handleValidation} from "../middlewares/handleValidation.js";
import {userCreateValidation, userLoginValidation} from "../middlewares/userValidation.js";

router.post('/registrar', userCreateValidation(), handleValidation, register);

router.post('/login', userLoginValidation(), handleValidation, login)

export default router;