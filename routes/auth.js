const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSingin } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    validarCampos
], login );

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSingin );


module.exports = router;