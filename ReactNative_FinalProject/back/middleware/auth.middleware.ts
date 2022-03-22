const jwt = require('jsonwebtoken')
import {config} from 'node-config-ts'

module.exports = (async (req: any, res: any, next: any) => {
    console.log(req.headers.authorization)
    if (req.method === 'OPTIONS') {
        console.log('тест опшнс')
        return next()
    }

    try {
        console.log('Зашел в трай')
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' })
        }
        console.log('попытка вериф')
        const decoded = jwt.verify(token, config.jwtKey)
        console.log(decoded)
        next()

    } catch (e) {
        console.log('Нет авторизации')
        console.log(e)
        res.status(401).json({ message: 'Нет авторизации' })
    }
})
