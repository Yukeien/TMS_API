const CreditCard = require("../models/creditCardModel")
const Address = require("../models/addressModel")

exports.registerCreditCard = (req, res, next) => {
    const creditCardNumber = req.body.creditCardNumber;
    CreditCard.findOne({ creditCardNumber: creditCardNumber })
    .exec()
    .then(creditCardNumber => {
        if (creditCardNumber) {
            return res.status(409).json({
                message: "This credit card is already used by an existing user."
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
            user: res.locals.userId
        })

        newCreditCard.save().then(creditCard => {
            return res.status(201).json({
                message: "Credit Card successfully registered.",
                caracteristics: creditCard
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
    CreditCard.find({'user': res.locals.userId})
    .exec().then(creditCards => {
        if (!creditCards) {
            return res.status(204).json({
                message: "No credit card registered on this user account."
            });
        }
        else {
            res.status(200).json({
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
    CreditCard.findById(creditCardName)
    .exec().then(creditCard => {
        if (!creditCard) {
            return res.status(204).json({
                message: "This credit card is not registered on this user account."
            });
        }
        else {
            return creditCard;
        }
    }).catch(err => {
        return res.status(500).json({
            error: err,
        });
    });
}

exports.updateCreditCard = (req, res, next) => {
    CreditCard.findOneAndUpdate({ 'creditCardName' : req.params.creditCardName })
    .then(result => {
        return result.status(200).json({
            message: "Credit Card successfully updated."
        });
    }).catch(err => {
        return res.status(500).json({
            error: err,
        });
    });
}

exports.deleteCreditCard = (req, res, next) => {
    const creditCardName = req.params.creditCardName;
    CreditCard.findOneAndDelete({ 'creditCardName' : creditCardName, 'user': res.locals.userId })
    .then(result => {
        return res.status(200).json({
            message: "Credit Card - " + result.creditCardName + " successfully deleted.",
        });
    }).catch(err => {
        return res.status(500).json({
            error: err.message,
        });
    });
}
