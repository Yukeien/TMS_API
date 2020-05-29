const Transfer = require("../models/transferModel");
const User = require("../models/userModel");

exports.registerTransfer = async (req, res, next) => {
    const receiver = await User.find({ email: req.body.receiverEmail });

    if (!receiver) {
        return res.status(404).json({
            error: "User targeted as receiver not found"
        })
    }

    Transfer.create({
        "sender": res.locals.userId,
        "receiver": receiver,
        "amount": req.body.amount
    })
    .then(transfer => {
        if (transfer) {
            return res.status(201).json({
                message: "Transfer query registered",
            });
        }

        return res.status(500).json({
            error: err.message
        });
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
};

exports.getTransfers = (req, res, next) => {
    Transfer.find({'owner': res.locals.userId})
    .exec().then(transfers => {
        if (!transfers) {
            return res.status(404).json({
                message: "No transfer was found on this user account."
            });
        } else {
            return res.status(200).json({
                "transfers": transfers
            })
        }
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
}

exports.deleteTransfer = (req, res, next) => {
    Transfer.findOneAndDelete({
        _id : req.body.transferId,
        owner: res.locals.userId,
        status: "On hold"
    })
    .then(result => {
        if (!result) {
            return res.status(404).json({
                message: "No transfer found with id " + req.body.transferId + " for this user"
            });
        } else {
            return res.status(200).json({
                message: "Transfer - " + result.id_ + " was successfully declined.",
            });
        }
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
}
