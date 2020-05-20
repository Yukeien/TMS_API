const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({
    cardHolderName: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true
    },
    creditCardNumber: {
        type: Number,
        minLength: 7,
        maxLength: 16,
        required: true
    },
    expirationDate: {
        type: Number,
        length: 4,
        required: true
    },
    CCV: {
        type: Number,
        length: 3,
        required: true
    },
    userID: { 
        type: String,
        required: true
    }
})

module.exports = mongoose.model("CreditCard", creditCardSchema);