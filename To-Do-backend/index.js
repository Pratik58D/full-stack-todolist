const express = require("express");
const app = express();

const connectionDb  = require("./src/config/db");
console.log(connectionDb())

const cors = require('cors');
app.use(cors());


const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

const createTodo = require("./src/routes/todoRoute");

app.use(express.json()); // Added line: Middleware to parse JSON request bodies
app.use("/api/todo/",createTodo);

app.listen(PORT, ()=>console.log(`server started ${PORT}`))