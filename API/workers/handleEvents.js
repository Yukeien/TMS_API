//const Event = require("../models/eventModel");
const Transfer = require("../models/transferModel");
const Vault = require("../models/vaultModel");
const args = require('worker_threads').workerData;

const mongoose = require('mongoose');
const { devDb, testingDb } = require("../../config");

let dbURI = "null";

if (process.env.NODE_ENV === "test") {
  dbURI = testingDb;
} else {
  dbURI = devDb;
}

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(dbURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

switch(args.eventType) {
    case "transfer":
        processTransfer(args.relativeId).catch(err => {
            console.log(err);
        });
        break;
}

async function processTransfer(transferId) {
    const currentTransfer = await Transfer.findOne({ _id: transferId }).catch(err => {
        console.err(err);
    });

    if (!currentTransfer) {
        console.log("[Transfer]: Processing error - No transfer found.");
        console.log("[Transfer]: Aborted.");
        return;
    }

    const senderVault = await Vault.findOne({ owner: currentTransfer.sender._id }).catch(err => {
        console.log(err);
    });
    const receiverVault = await Vault.findOne({ owner: currentTransfer.receiver._id }).catch(err => {
        console.log(err);
    });

    if (!senderVault.validity || !receiverVault.validity) {
        console.log("[Transfer]: Request error - One of the users vault is not available.");
        console.log("[Transfer]: Aborted.");
        currentTransfer.status = "Denied";
        currentTransfer.save().then().catch(err => {
            console.log(err);
        });
        return;
    }

    if (currentTransfer.amount > senderVault.balance) {
        console.log("[Transfer]: Request error - Insufficient balance");
        console.log("[Transfer]: Aborted.");
        currentTransfer.status = "Denied";
        currentTransfer.save().then().catch(err => {
            console.log(err);
        });
        return;
    }

    senderVault.balance -= currentTransfer.amount;
    senderVault.save().then().catch(err => {
        console.log(err);
    });

    receiverVault.balance += currentTransfer.amount;
    receiverVault.save().then().catch(err => {
        console.log(err);
    });

    currentTransfer.status = "Processed";
    currentTransfer.save().then().catch(err => {
        console.log(err);
    });

    console.log("[Transfer]: Processed " + currentTransfer._id + ".");
    return;
}