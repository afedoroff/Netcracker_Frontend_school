import {Types} from 'mongoose'


const ObjectId = Types.ObjectId;
const Project = require("../models/Project")
const User = require("../models/User")

exports.addProject = (async (req: any, res: any) => {
    try {
        const {projectName, description, creatorID} = req.body
        await Project.create({
            projectName: projectName,
            description: description,
            creatorID: creatorID
        });
        console.log('added project')
        res.status(200).json({message: 'project added'})
    } catch (e) {
        res.status(500).json({message: 'error test'})
    }
})

exports.deleteProject = (async (req: any, res: any) => {
    try {
        const {id} = req.body
        await Project.deleteOne({
            _id: new ObjectId(id)
        });
        res.status(200).json({message: 'project deleted'})
    } catch (e) {
        res.status(500).json({message: 'error test'})
    }
})

exports.getAllProject = (async (req: any, res: any, next: any) => {
    try {
        const projects = await Project.find().populate('participants');
        console.log(projects)
        res.status(200).json(projects)
        return
    } catch (e) {
        res.status(500).json({message: 'error test'})
    }
})

exports.getProjectUser = (async (req: any, res: any) => {
    console.log('2')
    try {
        let ProjectUser = await Project.findOne({_id: new ObjectId(req.query.id)});
        const users = [];
        for (let i=0; i<ProjectUser.participants.length; i++){
            const user = await User.findOne({_id: ProjectUser.participants[i]});
            users.push({id: user._id, username: user.username, firstname: user.firstName, lastname: user.lastName});
        }
        console.log(users)
        res.status(200).json(users)
        return
    } catch (e) {
        res.status(500).json({message: 'error test'})
    }
})

exports.updateProject = (async (req: any, res: any) => {
    try {
        const {id, project} = req.body
        await Project.updateOne({
            _id: new ObjectId(id)
        }, {
            $set:
                {
                    projectName: project.projectName,
                    description: project.description,
                }
        });
        console.log('updated')
        res.status(200).json({message: 'project updated'})
    } catch (e) {
        res.status(500).json({message: 'error test'})
    }
})

exports.addParticipants = (async (req: any, res: any) => {
    try {
        const {username, projectID} = req.body
        const user = await User.findOne({
            username: username
        });
       await console.log(user)
        if (!user._id) {
            res.status(500).json({message: 'Пользователь не найден'})
            return
        }

        await Project.updateOne({_id: new ObjectId(projectID)},
            {$push: {participants: {_id: new ObjectId(user._id)}}})
        res.status(200).json({message: 'project added', user: user})
    } catch (e) {
        res.status(500).json({message: 'error' + e.message})
    }
})

exports.deleteParticipants = (async (req: any, res: any) => {
    try {
        const {userID, projectID} = req.body
        const project = await Project.findOne({
            _id: new ObjectId(projectID)
        });

        if (!project._id) {
            res.status(500).json({message: 'Проект не найден'})
            return
        }

        await Project.updateOne(
            { _id: projectID },
            { $pull: {participants: new ObjectId(userID)} }
        )
        res.status(200).json({message: 'Участник удален'})
    } catch (e) {
        res.status(500).json({message: 'error' + e.message})
    }
})
