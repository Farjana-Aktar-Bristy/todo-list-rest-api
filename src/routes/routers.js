const express = require('express');
const router = express.Router();
const todoController = require("../controllers/todoController")
const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/createUser", userController.createUser);
router.post("/login", userController.login);

router.get("/readUser", authMiddleware, userController.readUser);
router.put("/updateUser", authMiddleware, userController.updateUser);

router.post("/createTodo", authMiddleware, todoController.createTodo);
router.get("/getTodos", authMiddleware, todoController.getTodos);
router.put("/updateTodo", authMiddleware, todoController.updateTodo);
router.put("/updateTodoStatus", authMiddleware, todoController.updateTodoStatus);
router.put("/removeTodo", authMiddleware, todoController.removeTodo);

module.exports = router;