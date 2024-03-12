const TodoModel = require("../models/todoModel");

exports.createTodo = (req, res) => {
    let todo = req.body;
    todo.username = req.headers["username"];
    todo.createdDate = Date.now();
    todo.updatedDate = Date.now();
    todo.status = "new";
    console.log("Todo = ", JSON.stringify(todo));
    TodoModel.create(todo, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    });
}

exports.getTodos = (req, res) => {
    let username = req.headers['username']
    TodoModel.find({ username: username }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}

exports.updateTodo = (req, res) => {
    let updatedTodo = {
        subject: req.body["subject"],
        description: req.body["description"],
        updatedDate: Date.now()
    }
    let _id = req.body['_id']
    TodoModel.updateOne({ _id: _id }, { $set: updatedTodo }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}


exports.updateTodoStatus = (req, res) => {
    let _id = req.body['_id']
    let updatedTodo = {
        status: req.body["status"],
        updatedDate: Date.now()
    }
    TodoModel.updateOne({ _id: _id }, { $set: updatedTodo }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}

exports.removeTodo = (req, res) => {
    let _id = req.body['_id']
    TodoModel.remove({ _id: _id }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}