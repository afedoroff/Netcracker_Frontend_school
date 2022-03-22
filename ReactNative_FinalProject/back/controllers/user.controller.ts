import {Schema, Types} from "mongoose";

const ObjectId = Types.ObjectId;

const User = require("../models/User");

exports.getUsers = (async (req: any, res: any) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
        return
    } catch (e) {
        res.status(500).json({message: 'error test'})
    }
})

// exports.getUser = (async (req: any, res: any) => {
//     try {
//         console.log(req.query.participantID)
//         let user = await User.findOne({_id: req.query.participantID});
//         console.log(user)
//         res.status(200).json(user)
//         return
//     } catch (e) {
//         res.status(500).json({message: 'error test'})
//     }
// })

exports.getUser = (async (req: any, res: any) => {
    try {
        let user = await User.findOne({_id: new ObjectId(req.query.id)});
        console.log(user)
        res.status(200).json(user)
      return
    } catch (e) {
      res.status(500).json({message: 'error test'})
    }
  })
