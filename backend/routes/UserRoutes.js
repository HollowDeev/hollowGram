import express from 'express';
const router = express();

// controller
import {register} from '../controllers/UserController.js';

// middlewares
import {handleValidation} from "../middlewares/handleValidation.js";
import {userCreateValidation} from "../middlewares/userValidation.js";

router.post('/registrar', userCreateValidation(), handleValidation, register);

export default router;