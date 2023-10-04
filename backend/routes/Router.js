import express from 'express';
const router = express();

// Rota de teste
router.get('/', (req, res) => {
    res.send('OLÁ MUNDO');
})
export default router;