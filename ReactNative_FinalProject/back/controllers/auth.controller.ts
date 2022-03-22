const bcrypt = require('bcryptjs')
import {config} from 'node-config-ts'
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const User = require("../models/User")


exports.register = (async (req: any, res: any) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {username, password, specialization, email, firstname, lastname, avatar } = req.body

        const candidates = await User.findOne({username})

        if (candidates) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({username,
            password: hashedPassword,
            firstName: firstname,
            lastName: lastname,
            type: 'Viewer',
            email: email,
            specialization: specialization,
            avatar: avatar
        })
        console.log(user)
        await user.save()

        res.status(201).json({message: 'Пользователь создан', success: true})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

exports.login = (async (req: any, res: any) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректный данные при входе в систему'
            })
        }

        const {username, password} = req.body

        const user = await User.findOne({username})

        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.jwtKey,
            {expiresIn: '26d'}
        )

        res.json({token, userId: user.id})
        console.log('Вход выполнен')

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

