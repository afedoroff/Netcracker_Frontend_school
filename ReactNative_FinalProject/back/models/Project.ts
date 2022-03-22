import {Schema, model} from 'mongoose'

const schema = new Schema({
    projectName: {type: String, required: true},
    description: {type: String},
    creatorID: {type: Schema.Types.ObjectId, ref: 'User'},
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
})

module.exports = model('Project', schema)
