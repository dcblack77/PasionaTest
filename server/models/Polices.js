const {Schema, model} = require('mongoose');


let PolicesSchema = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    amountInsured: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    inceptionDate: {
        type: String,
        require: true
    },
    installmentPayment: {
        type: String,
        require: true,
    },
    clientId: {
        type: String
    }
});

module.exports = model("Polices", PolicesSchema);
