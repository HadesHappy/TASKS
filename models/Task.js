const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let taskSchema = new Schema({
    title: {
        type: String
    },
    date: {
        type: String
    }
}, {
    collection: 'tasks'
})

module.exports = mongoose.model('Task', taskSchema)