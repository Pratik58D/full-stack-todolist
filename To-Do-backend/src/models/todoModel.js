const mongoose = require("mongoose");

const schema = mongoose.Schema;
const todoSchema = new schema({
    text: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});



const TODO = mongoose.model("todo",todoSchema);

module.exports = TODO ;