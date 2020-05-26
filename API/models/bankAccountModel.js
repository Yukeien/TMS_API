const mongoose = require("mongoose");

//const countriesList = require('./contriesList')

const bankAccountSchema = new mongoose.Schema({
    country: {
        type: String,
        //enum: [countriesList],
        required: true
    },
    IBAN: {
        type: String,
        minlength: 27,
        maxlength: 27,
        required: true
    },
    Status: {
        type: String,
        default: 'Unverified',
        required: true,
    },
    Owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const User = require("./userModel");

module.exports = mongoose.model("BankAccount", bankAccountSchema);