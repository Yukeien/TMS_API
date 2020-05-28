const CreditCard = require("../models/creditCardModel")
const Address = require("../models/addressModel")

exports.registerCreditCard = (req, res, next) => {
    const creditCardNumber = req.body.creditCardNumber;
    CreditCard.findOne({ creditCardNumber: creditCardNumber, 'owner': res.locals.userId })
    .exec()
    .then(creditCard => {
        if (creditCard) {
            return res.status(409).json({
                message: "This credit card is already registered."
            });
        }

        const newCreditCard = new CreditCard({
            creditCardName: req.body.creditCardName,
            cardHolderName: req.body.cardHolderName,
            cardType: req.body.cardType,
            creditCardNumber: req.body.creditCardNumber,
            expirationDate: req.body.expirationDate,
            CCV: req.body.CCV,
            billingAddress: new Address(req.body.billingAddress),
            owner: res.locals.userId
        })

        newCreditCard.save().then(creditCard => {
            return res.status(201).json({
                message: "Credit Card successfully registered.",
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

exports.getCreditCards = (req, res, next) => {
    CreditCard.find({'owner': res.locals.userId})
    .exec().then(creditCards => {
        if (!creditCards || !creditCards.length) {
            return res.status(200).json({
                message: "No credit card registered on this user account."
            });
        } else {
            return res.status(200).json({
                "Credit Cards": creditCards
            })
        }
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
}

exports.getCreditCard = (req, res, next) => {
    const creditCardName = req.params.creditCardName;
    CreditCard.findOne({'creditCardName': creditCardName, 'owner': res.locals.userId})
    .exec().then(creditCard => {
        try {
            if (!creditCard) {
                return res.status(200).json({
                    message: "There is no corresponding credit card." 
                })
            } else {
                return res.status(200).json({
                    "Credit Card": creditCard
                })
            }
        } catch(error) {
            return res.status(204).json({
                message: "This credit card is not registered on this user account.",
                error: error.message
            });
        }
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
}

exports.updateCreditCard = (req, res, next) => {
    const creditCardName = req.params.creditCardName;
    CreditCard.findOneAndUpdate({ 'creditCardName' : creditCardName, 'owner': res.locals.userId }, req.body)
    .then(() => {
        return res.status(200).json({
            message: "Credit Card successfully updated."
        });
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
}

exports.deleteCreditCard = (req, res, next) => {
    const creditCardName = req.params.creditCardName;
    CreditCard.findOneAndDelete({ 'creditCardName' : creditCardName, 'owner': res.locals.userId })
    .then(result => {
        if (!result) {
            return res.status(200).json({
                message: "This credit card is not registered on this account."
            });
        } else {
            return res.status(200).json({
                message: "Credit Card - " + result.creditCardName + " successfully deleted.",
            });
        }
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
}
