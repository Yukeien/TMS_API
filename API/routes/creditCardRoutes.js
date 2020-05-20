const express = require("express");
const router = express.Router();

router.post(
    "/credit-card",
//    validation(validationSchemas.creditCard),
    creditCardController.registerCard
);

// router.get("credit-card", creditCardController.getCard)

// router.put("/credit-card", creditCardController.updateCard)

// router.delete("/credit-card", creditCardController.deleteCard);

module.exports = router;
