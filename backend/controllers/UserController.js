import User from '../models/User.module.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "5d",
    })
}

// Registrar e logar usuario

const register = async(req, res) => {
    const {nome, email, senha} = req.body;

    // Verificacao se o usuario já existe
    const user = await User.findOne({email});
    if(user){
        res.status(422).json({error: "Email já cadastrado"})
        return
    }

    // Criptografia da senha
    const salt = await bcrypt.genSalt();
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const objUsuario = {
        nome,
        email,
        senha: senhaCriptografada
    };

    // Criacao do usuario
    const novoUsuario = await User.create(objUsuario);

    //Verificacao se o usuario foi criado com sucesso
    if(!novoUsuario){
        res.status(422).json({error: "Houve um erro no servidor, tente em alguns instantes"})
    }

    res.status(201).json({
        _id: novoUsuario._id,
        nome: novoUsuario.nome,
        token: generateToken(novoUsuario._id)
    })
}

export {
    register
}