import express from 'express';
const router = express();

// Importacao de rotas
import userRoutes from "./UserRoutes.js";
router.use('/api/users', userRoutes);

// Rota de teste
router.get('/', (req, res) => {
    res.send('OLÁ MUNDO');
})
export default router;