import {Router} from 'express'
import {check} from "express-validator";

const AuthRouter = Router()
const authController = require('../controllers/auth.controller')

AuthRouter.post('/login', [
    check('username', 'Введите username').not().isEmpty(),
    check('password', 'Введите пароль').exists()
], authController.login)

AuthRouter.post('/register', [
    check('username', 'Введите username').not().isEmpty(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
], authController.register)

module.exports = AuthRouter;
