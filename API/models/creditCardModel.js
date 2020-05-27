const mongoose = require("mongoose"), Schema = mongoose.Schema;

//const cardTypes = require('./cardTypes')

const creditCardSchema = new mongoose.Schema({
    creditCardName: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true
    },
    cardHolderName: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true
    },
    cardType: {
        type: String,
        enum: ['American Express', 'Mastercard', 'Visa', 'Maestro'],
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
    billingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: false
    }
})

const Address = require('./addressModel')
const User = require("./userModel");

module.exports = mongoose.model("CreditCard", creditCardSchema);
