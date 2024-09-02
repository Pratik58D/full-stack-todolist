const express = require("express");
const router = express.Router();

const { createTodo, deleteTodo, getTodos } = require("../controllers/todoController");

router.post("/create", createTodo);
router.delete("/delete/:id", deleteTodo);
router.get("/", getTodos); // New route to get all todos

module.exports = router;
