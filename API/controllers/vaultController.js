const Vault = require("../models/vaultModel");

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
