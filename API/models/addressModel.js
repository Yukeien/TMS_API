const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true
    },
    zipcode: {
        type: Number,
        minlength: 5,
        maxLength: 5,
        required: true
    },
    city: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true
    },
    country: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true
    }
})

module.exports = mongoose.model("Address", addressSchema);