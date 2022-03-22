import {Router} from 'express'
const ProjectRouter = Router()
const projectController = require('../controllers/project.controller')

ProjectRouter.post('/add', projectController.addProject)
ProjectRouter.post('/delete', projectController.deleteProject)
ProjectRouter.put('/update', projectController.updateProject)
ProjectRouter.get('/', projectController.getAllProject)
ProjectRouter.post('/addParticipants', projectController.addParticipants)
ProjectRouter.get('/getProjectUser', projectController.getProjectUser)
ProjectRouter.post('/deleteParticipant', projectController.deleteParticipants)

module.exports = ProjectRouter;

