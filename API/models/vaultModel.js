const mongoose = require("mongoose"), Schema = mongoose.Schema;

const vaultSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    validity: {
        type: Boolean,
        required: true,
        default: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0.0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const User = require("./userModel");

vaultSchema.post("save", function(vault, next) {
    vault.updatedAt = Date.now();
    vault.save();
    next();
})

module.exports = mongoose.model("Vault", vaultSchema);
