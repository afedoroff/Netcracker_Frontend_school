import {Router} from 'express'
const UserRouter = Router()
const userController = require('../controllers/user.controller')

UserRouter.get('/getUsers', userController.getUsers)
UserRouter.get('/getUser', userController.getUser)

module.exports = UserRouter;

