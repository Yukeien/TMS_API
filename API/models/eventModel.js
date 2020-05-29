const mongoose = require("mongoose"), Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        enum: ["transfer"],
        required: true
    },
    relativeId: {
        type: Number,
        required: true
    },
    processed: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Event", eventSchema);
