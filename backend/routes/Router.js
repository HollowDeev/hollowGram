import express from 'express';
const router = express();

// Importacao de rotas
import userRoutes from "./UserRoutes.js";
router.use('/api/users', userRoutes);


export default router;