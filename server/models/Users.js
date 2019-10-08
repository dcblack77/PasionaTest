const {Schema, model} = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

let validRoles = {
    values: ["admin", "user"],
    message: "{VALUE} is not a valid role"
};

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: validRoles
    },
    password: {
        type: String,
        require: true
    },
    id: {
        type: String,
    }
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

UserSchema.plugin(uniqueValidator, {
    message: "{PATH} this value already exists in our database"
});

module.exports = model("Users", UserSchema);
