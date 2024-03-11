const UserModel = require("../models/userModel");
var jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
    let user = req.body;
    console.log("request body: ", JSON.stringify(user));
    UserModel.create(user, (err, user) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: user })
        }
    });
}

exports.login = (req, res) => {
    let username = req.body['username'];
    let password = req.body['password'];
    UserModel.findOne({ username: username, password: password }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            if (data) {
                let payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data }
                let token = jwt.sign(payload, 'mySecretKey123');

                res.status(200).json({ status: "success", token: token, data: data })
            }
            else {
                res.status(401).json({ status: "unauthorized" })
            }
        }
    })
}

exports.readUser = (req, res) => {
    let username = req.headers['username']
    UserModel.find({ username: username }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}

exports.updateUser = (req, res) => {
    let username = req.headers['username']
    let user = req.body;
    UserModel.updateOne({ username: username }, { $set: user }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}
