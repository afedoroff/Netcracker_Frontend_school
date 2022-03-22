import {Schema, model} from 'mongoose'

const subSchema = new Schema({
    userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    createDate: {type: Date, required: true, default: Date.now()}
});

const schema = new Schema({
    taskName: {type: String, required: true},
    status: {type: String, required: true, default: "Открыта"},
    priority: {type: String, required: true},
    creatorID: {type: Schema.Types.ObjectId, ref: 'User'},
    participantID: {type: Schema.Types.ObjectId, ref: 'User'},
    description: {type: String},
    component: {type: String, required: true},
    type: {type: String, required: true},
    createDate: {type: Date, default: Date.now()},
    endDate: {type: Date, required: true},
    startDate: {type: Date, required: true},
    projectID: {type: Schema.Types.ObjectId, ref: 'Project', /*required: true*/},
    comment: [{type: subSchema}],
    attachments: [{type: String}]
})

module.exports = model('Task', schema)
