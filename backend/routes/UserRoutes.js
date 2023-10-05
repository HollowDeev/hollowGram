import express from 'express';
const router = express();

// controller
import {register} from '../controllers/UserController.js';

router.post('/registrar', register);

export default router;