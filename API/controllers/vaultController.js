const Vault = require("../models/vaultModel");
const CreditCard = require("../models/creditCardModel")

exports.addMoneyFromCard = (req, res, next) => {
    const creditCardName = req.body.creditCardName;
    const amount = req.body.amount;
    CreditCard.findOne({ creditCardName: creditCardName, 'owner': res.locals.userId })
    .exec()
    .then(creditCard => {
        if (creditCard.get('status') === true) {
            Vault.findOne({'owner': res.locals.userId})
            .exec().then(vault => {
                if (vault) {
                    const balance = vault.get('balance') + amount;
                    Vault.findOneAndUpdate({ 'owner': res.locals.userId}, {'balance': balance})
                    .then(() => {
                        return res.status(200).json({
                            message: "Balance successfully updated."
                        });
                    }).catch(err => {
                        return res.status(500).json({
                            error: err.message,
                        });
                    });
                }
            })
        } else {
            return res.status(200).json({
                message: "Invalid credit card."
            });
        }
    })
}

exports.getVault = (req, res, next) => {
    Vault.find({'owner': res.locals.userId})
    .exec().then(vault => {
        if (!vault) {
            return res.status(404).json({
                message: "User vault not found, please contact an Administrator"
            });
        } else {
            return res.status(200).json({
                "vault": vault
            })
        }
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
}
