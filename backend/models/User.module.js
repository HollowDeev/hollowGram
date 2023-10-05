import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    nome: String,
    email: String,
    senha: String,
    imagemPerfil: String,
    bio: String,
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

export default User;