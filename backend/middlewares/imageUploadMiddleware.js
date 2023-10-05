import multer from 'multer';
import path from "path";

// Configuracao de arquivos - necessario pro tipo ES Módules
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const armazenamentoImagem = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";

        if(req.baseUrl.includes("users")){
            folder = "users";
        } else if(req.baseUrl.includes("photos")){
            folder = "photos";
        }

        cb(null, `uploads/${folder}`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadImagem = multer({
    storage: armazenamentoImagem,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Por favor, envie apenas png ou jpg!"))
        }
        cb(undefined, true);
    }
})

export default uploadImagem;