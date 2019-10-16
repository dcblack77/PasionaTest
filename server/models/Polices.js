const {Schema, model} = require('mongoose');


let PoliciesSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref:'users'
    }
});

module.exports = model("Policies", PoliciesSchema);
