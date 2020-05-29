const mongoose = require("mongoose"), Schema = mongoose.Schema;

const transferSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["Denied", "On hold", "Processed"],
        default: "On hold",
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const User = require("./userModel");

module.exports = mongoose.model("Transfer", transferSchema);
