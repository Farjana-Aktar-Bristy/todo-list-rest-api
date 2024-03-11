const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    city: { type: String },
    username: { type: String, unique: true },
    password: { type: String }
});
const UserModel = mongoose.model('users', DataSchema);
module.exports = UserModel