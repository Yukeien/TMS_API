const CreditCard = require("../models/creditCardModel")
// const jwt = require("jsonwebtoken");

// const { jwtKey } = require("../../config");

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
        const newCreditCard = new CreditCard({
            cardHolderName: req.body.cardHolderName,
            creditCardNumber: req.body.creditCardNumber,
            expirationDate: req.body.expirationDate,
            CCV: req.body.ccv,
            userID: req.user._id
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
    }).catch(err => {
        return res.status(500).json({
            error: err,
        });
    });
};

/*    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
        const userID = jwt.verify(token, jwtKey, function(err, decoded) {
            return res.status(500).json({
                error: err,
            });
        });
        console.log(userID)
    }
*/

exports.getCard = (req, res, next) => {
    CreditCard.findById(req.user._id)
    .exec().then(creditCards => {
        if (!creditCards) {
            return res.status(204).json({
                message: "No credit card registered on this user account."
            });
        }
        else {
            return creditCards;
        }
    }).catch(err => {
        return res.status(err.code).json({
            error: err.message,
        });
    });
}

exports.updateCard = (req, res, next) => {
}

exports.deleteCard = (req, res, next) => {
}
