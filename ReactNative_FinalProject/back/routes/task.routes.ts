import {Router} from 'express'
const TaskRouter = Router()
const taskController = require('../controllers/task.controller')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'attachments/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

TaskRouter.post('/add', taskController.addTask)
TaskRouter.put('/update', taskController.updateTask)
TaskRouter.post('/updateStatus', taskController.updateStatus)
TaskRouter.post('/updatePriority', taskController.updatePriority)
TaskRouter.post('/addComment', taskController.addComment)
TaskRouter.post('/delete', taskController.deleteTask)
TaskRouter.get('/', taskController.getAllTasks)
TaskRouter.get('/myTasks', taskController.getMyTasks)
TaskRouter.get(`/projectTasks`, taskController.getTasksByProject)
TaskRouter.post('/deleteComment', taskController.deleteComment)
TaskRouter.put('/updateComment', taskController.updateComment)
TaskRouter.post('/uploadFile', upload.single('file'), taskController.uploadFile)
TaskRouter.post('/deleteFile', taskController.deleteFile)

module.exports = TaskRouter;

