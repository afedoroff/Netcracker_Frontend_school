import path = require("path");

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task.routes')
const projectRouter = require('./routes/project.routes')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const auth = require('./middleware/auth.middleware')
import {config} from 'node-config-ts'

const PORT = config.port || 3000

const app = express();

app.use(bodyParser.json())
app.use("/attachments/", express.static(path.join(__dirname, "./attachments")))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

async function start() {
    try {
        await mongoose.connect("mongodb+srv://adminNet:h377vd8d2g4@cluster0.0dccm.mongodb.net/PManager?retryWrites=true&w=majority")
        app.listen(PORT, () => {
            console.log("Server is running")
        })
    } catch (e) {
        console.log(e)
    }
}

start().then(r => console.log('run'))

app.use("/task", taskRouter)
app.use("/user", userRouter)
app.use("/project", /* auth, */ projectRouter)
app.use("/auth", authRouter)
