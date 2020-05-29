const BankAccount = require("../models/bankAccountModel")

exports.registerBankAccount = (req, res, next) => {
    const IBAN = req.body.IBAN;
    BankAccount.findOne({IBAN: IBAN, 'owner': res.locals.userId})
    .exec()
    .then(bankAccount => {
        if (bankAccount) {
            return res.status(409).json({
                message: "This bank account is already registered."
            });
        }

        const newBankAccount = new BankAccount({
            country: req.body.country,
            IBAN: req.body.IBAN,
            owner: res.locals.userId
        })

        newBankAccount.save().then(bankAccount => {
            res.status(201).json({
                message: "Bank Account successfully registered.",
            });
        }).catch(err => {
            return res.status(500).json({
                error: err.message
            });
        })
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
};

exports.getBanks = (req, res, next) => {
    BankAccount.find({'owner': res.locals.userId})
    .exec().then(bankAccounts => {
        if (!bankAccounts || !bankAccounts.length) {
            return res.status(200).json({
                message: "No bank account registered on this user account."
            });
        } else {
            return res.status(200).json({
                "Banks": bankAccounts
            })
        }
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
}
