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
    res.send('registro')
}

export {
    register
}