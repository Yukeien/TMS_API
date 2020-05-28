const mongoose = require("mongoose"), Schema = mongoose.Schema;

const countriesList = ['France', 'Germany', 'United Kingdom', 'United States', 'Canada', 'Italy'];

const bankAccountSchema = new mongoose.Schema({
    country: {
        type: String,
        enum: countriesList,
        required: true
    },
    IBAN: {
        type: String,
        minlength: 27,
        maxlength: 27,
        required: true
    },
    status: {
        type: String,
        default: false,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const User = require("./userModel");

module.exports = mongoose.model("BankAccount", bankAccountSchema);
