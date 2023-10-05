import {validationResult} from "express-validator";


const handleValidation = (req, res , next) => {

    const erros = validationResult(req);

    if(erros.isEmpty()){
        return next();
    }

    const extractedErros = [];

    erros.array().map((err) => extractedErros.push(err.msg))

    return res.status(422).json({
        errors: extractedErros,
    })

}

export {
    handleValidation
}