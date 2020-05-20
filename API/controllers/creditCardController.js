const CreditCard = require("../models/creditCardModel")

exports.registerCard = (req, res, next) => {
    const creditCardNumber = req.body.creditCardNumber;
    CreditCard.findOne({ creditCardNumber: creditCardNumber })
    .exec()
    .then(creditCardNumber => {
        if (creditCardNumber) {
            return res.status(409).json({
                message: "This credit card is already used by an existing user."
            });
        }
    }).catch(err => {
        return res.status(500).json({
            error: err,
        });
    });

    const userID = 'Need to call a method to retrieve current user ID';

    const newCreditCard = new CreditCard({
        cardHolderName: req.body.cardHolderName,
        creditCardNumber: req.body.creditCardNumber,
        expirationDate: req.body.expirationDate,
        CCV: req.body.ccv,
        userID: userID
    })

    newCreditCard.save().then(result => {
        return res.status(201).json({
            message: "Credit Card successfully registered.",
            submessage: result
        });
    }).catch(err => {
        return res.status(500).json({
            error: err
        });
    })
}