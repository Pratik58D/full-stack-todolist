const TODO = require("../models/todoModel");

const createTodo = async (req, res) => {
    const data = req.body;

    if (!data.text) {
        return res.status(400).json({ msg: "Please enter the Todos" });
    }
    try {
        const todo = new TODO({
            text: data.text,
        });
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await TODO.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.status(200).json({ msg: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await TODO.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createTodo, deleteTodo, getTodos };
