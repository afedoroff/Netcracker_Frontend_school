import {Schema, model} from 'mongoose'

const schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    type: {type: String, required: true},
    email: {type: String},
    specialization: {type: String}
})

module.exports = model('User', schema)
