import {body} from 'express-validator';

const validacaoCadastro = () => {
    return [
        body('nome')
            .isString()
            .withMessage("O nome é obrigatorio.")
            .isLength({min: 3})
            .withMessage("O nome precisa ter no mínimo 3 caracteres"),
        body('email')
            .isString()
            .withMessage('O e-mail é obrigaatório')
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('senha')
            .isString()
            .withMessage('A senha é orbrigatória')
            .isLength({min: 6})
            .withMessage('A senha precisa ter no mínimo 6 caracteres'),
        body('confirmarSenha')
            .isString()
            .withMessage('A confirmação de senha é obrigatória')
            .custom((value, {req}) => {
                if( value !== req.body.senha){
                    throw new Error("As senhas não são iguais")
                }
                return true
            })
    ]
}

const validacaoLogin = () => {
    return [
        body('email')
            .isString()
            .withMessage("O e-mail é obrigatorio")
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('senha')
            .isString()
            .withMessage("A senha é obrigatória")
    ]
}

const validacaoUpdate = () => {
    return [
        body("name")
            .optional()
            .isLength({min: 3})
            .withMessage("O nome precisa de pelo menos 3 caracteres"),
        body("senha")
            .optional()
            .isLength({min: 6})
            .withMessage("A senha precisa de pelo menos 6 caracteres")
    ]
}

export {
    validacaoCadastro,
    validacaoLogin,
    validacaoUpdate
}