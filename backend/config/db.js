import dotenv from 'dotenv';
dotenv.config()

import mongoose from 'mongoose'
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connection = async ()  => {
    try {
        const dbConnection = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@hollowgram.j6yhyfo.mongodb.net/?retryWrites=true&w=majority`)

        console.log('banco conectado');

        return dbConnection;

    }catch (e) {
        console.error(e)
    }
}

connection();

export default connection();