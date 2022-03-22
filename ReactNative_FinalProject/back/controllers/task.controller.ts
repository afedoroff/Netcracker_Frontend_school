const Task = require("../models/Task");
import {Types} from 'mongoose'
const ObjectId = Types.ObjectId;

exports.getAllTasks = (async (req: any, res: any) => {
    try {
        let tasks = await Task.find().populate('projectID').populate('participantID').populate('comment.userID');
        res.status(200).json(tasks);
        return
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.getMyTasks = (async (req: any, res: any) => {
    try {
        console.log(req.query.participantID)
        let tasks = await Task.find({participantID: new ObjectId(req.query.participantID)}).populate('projectID').populate('participantID').populate('comment.userID');
        res.status(200).json(tasks);
        return
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.getTasksByProject = (async (req: any, res: any) => {
    try {
        console.log("ok")
        let tasks = await Task.find({projectID: new ObjectId(req.query.projectID)}).populate('participantID').populate('comment.userID');
        res.status(200).json(tasks);
        return
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.addTask = (async (req: any, res: any) => {
    try {
        const {taskName, description, component, type, priority, status, projectID, startDate,endDate, participantID} = req.body;
        await Task.create({
            taskName: taskName,
            description: description,
            component: component,
            type: type,
            priority: priority,
            status: status,
            projectID: projectID,
            startDate: startDate,
            endDate: endDate,
            participantID: new ObjectId(participantID)
        });
        console.log('added')
        res.status(200).json({message: 'task added'});
    } catch (e) {
        res.status(500).json(e.message);
    }
})

exports.deleteTask = (async (req: any, res: any) => {
    try {
        const {id} = req.body
        await Task.deleteOne({_id: id});
        console.log('deleted ' + id)
        res.status(200).json({message: 'task added'});
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.updateTask = (async (req: any, res: any) => {
    try {
        const {task, taskID} = req.body;
        const t = await Task.findOne({_id: taskID})
        console.log(task.participantID)
        console.log(t.participantID)
        await Task.updateOne({
            _id: taskID
        }, {
            $set:
                {
                    taskName: task.taskName,
                    status: task.status,
                    priority: task.priority,
                    description: task.description,
                    participantID: task.participantID,
                    endDate: task.endDate,
                    startDate: task.startDate,
                    component: task.component,
                    type: task.type,
                }
        });
        console.log('Task updated')
        res.status(200).json({message: 'Task updated'});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'error test'});
    }
})

exports.updateStatus = (async (req: any, res: any) => {
    try {
        const {taskID, option} = req.body;
        await Task.updateOne({
            _id: taskID
        }, {
            $set:
                {
                    status: option,
                }
        });
        res.status(200).json({message: 'Status updated'});
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.updatePriority = (async (req: any, res: any) => {
    try {
        const {taskID, option} = req.body;
        await Task.updateOne({
            _id: taskID
        }, {
            $set:
                {
                    priority: option
                }
        });
        res.status(200).json({message: 'Priority updated'});
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.addComment = (async (req: any, res: any) => {
    try {
        const {taskID, comment} = req.body;
        console.log(comment);
        await Task.updateOne({
            _id: taskID
        }, {
            $push:
                {
                    comment: comment,
                }
        });
        const task = await Task.findOne({_id: taskID}, 'comment').populate('comment.userID');
        res.status(200).json({comments: task.comment});
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.updateComment = (async (req: any, res: any) => {
    try {
        const {commentID, text, taskID} = req.body
        await Task.updateOne({_id: taskID, "comment._id": commentID}, {
            $set:
                {
                    "comment.$.text": text
                }
        });
        const task = await Task.findOne({_id: taskID}, 'comment').populate('comment.userID');
        res.status(200).json({comments: task.comment});
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.deleteComment = (async (req: any, res: any) => {
    try {
        const {taskID, commentID} = req.body
        await Task.updateOne({_id: taskID}, {
            $pull: { "comment": { "_id": commentID } }
        });
        const task = await Task.findOne({_id: taskID}, 'comment').populate('comment.userID');
        res.status(200).json({comments: task.comment});
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.getTask = (async (req: any, res: any) => {
    try {
        const tasks = await Task.find({projectID: req.body.projectID});
        res.status(200).json(tasks)
        return
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})

exports.uploadFile = (async (req: any, res: any) => {
    try {
        const {taskID, fileName} = req.query;
        await Task.updateOne({
            _id: taskID
        }, {
            $push:
              {
                  attachments: fileName,
              }
        });
        const task = await Task.findOne({_id: taskID});
        res.status(200).json({attachments: task.attachments});
        return
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})
const fs = require('fs')

exports.deleteFile = (async (req: any, res: any) => {
    try {
        const {taskID, attachmentName} = req.body
        await Task.updateOne({_id: taskID}, {
            $pull: { "attachments": attachmentName }
        });
        fs.unlink(`${__dirname}/../attachments/${attachmentName}`, function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("Файл удалён");
            }
        });
        const task = await Task.findOne({_id: taskID});
        res.status(200).json({attachments: task.attachments});
    } catch (e) {
        res.status(500).json({message: 'error test'});
    }
})
