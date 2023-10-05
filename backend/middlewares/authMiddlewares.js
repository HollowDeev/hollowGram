import User from '../models/User.module.js';
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    // Verificando o tolen do header
    if(!token) return res.status(401).json({erros: ["Acesso negado!"]});
    
    // Verificando se o token é valido
    try {

        const verificado = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verificado.id).select("-senha");

        next();

    }catch (e) {
        res.status(401).json({erros: ["Token inválido"]});
    }
}

export {
    authMiddleware
}