import User from '../models/User.module.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "5d",
    })
}

const generatePassword = async(senha) => {
    const salt = await bcrypt.genSalt();
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    return senhaCriptografada;
}

// Registrar e logar usuario
const register = async(req, res) => {
    const {nome, email, senha} = req.body;

    // Verificacao se o usuario já existe
    const user = await User.findOne({email});
    if(user){
        res.status(422).json({error: ["Email já cadastrado"]})
        return
    }

    // Criptografia da senha
    const senhaCriptografada = await generatePassword(senha)

    const objUsuario = {
        nome,
        email,
        senha: senhaCriptografada
    };

    // Criacao do usuario
    const novoUsuario = await User.create(objUsuario);

    //Verificacao se o usuario foi criado com sucesso
    if(!novoUsuario){
        res.status(422).json({error: ["Houve um erro no servidor, tente em alguns instantes"]})
    }

    res.status(201).json({
        _id: novoUsuario._id,
        nome: novoUsuario.nome,
        token: generateToken(novoUsuario._id)
    })
}

// Logar usuario
const login = async(req, res) => {

    const {email, senha} = req.body;

    const user = await User.findOne({email});

    // Verificar se o usuario existe
    if(!user){
        res.status(404).json({errors: ["usuário não encontrado"]})
    }

    // Veficar senha correta
    if(!(await bcrypt.compare(senha, user.senha))){
        res.status(422).json({errors: ["Senha inválida"]});
    }

    // Retornar token de login
    res.status(201).json({
        _id: user._id,
        nome: user.nome,
        imagemPerfil: user.imagemPerfil,
        token: generateToken(user._id)
    })
}

// Retornar informacoes do usuario
const pegarDadosUsuarios = (req, res) => {
    const user = req.user;

    res.status(200).json(user);
}

// Atualiza dados do usuario
const update = async(req, res) => {

    const reqUser = req.user;

    const {nome, senha, bio} = req.body;

    let imagemPerfil = null;

    if(req.file) {
        imagemPerfil = req.file.filename;
    }

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-senha")

    if(nome) user.nome = nome;

    if(senha){
        const senhaCriptografada = generatePassword(senha);

        user.senha = senhaCriptografada;
    }

    if(imagemPerfil) user.imagemPerfil = imagemPerfil;

    if(bio) user.bio = bio;

    await user.save();

    res.status(200).json(user)

}

const buscarPorId = async(req, res) => {
    try{

        const {id} = req.params;

        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-senha");

        //verificar se o usuario existe
        if(!user){
            res.status(400).json({errors: ["Usuario não encontrado"]})
            return
        }

        res.status(200).json(user)

    }catch (e) {
        res.status(400).json({errors: ["Usuario não encontrado"]})
    }
}

export {
    register,
    login,
    pegarDadosUsuarios,
    update,
    buscarPorId
}