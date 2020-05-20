const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({
    cardHolderName: {
        Type: String,
        minLenght: 2,
        maxLenght: 25,
        required: true
    },
    creditCardNumber: {
        Type: Number,
        minLenght: 7,
        maxLenght: 16,
        required: true
    },
    expirationDate: {
        Type: Number,
        length: 4,
        required: true
    },
    CCV: {
        Type: Number,
        length: 3,
        required: true
    },
    userID: { 
        Type: String,
        required: true
    }
})

module.exports = mongoose.model("CreditCard", creditCardSchema);