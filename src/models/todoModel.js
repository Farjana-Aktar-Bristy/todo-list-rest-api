const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    username: { type: String },
    subject: { type: String },
    description: { type: String },
    status: { type: String },
    createdDate: { type: Date },
    updatedDate: { type: Date }
}, { versionKey: false });
const TodoModel = mongoose.model('todos', DataSchema);
module.exports = TodoModel