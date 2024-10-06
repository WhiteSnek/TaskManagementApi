const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const taskSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    timestamps: true
})
const Task = mongoose.model("Task",taskSchema)

module.exports = {Task};