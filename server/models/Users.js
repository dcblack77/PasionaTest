const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    }
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass;

    return userObject;
};

UserSchema.plugin(uniqueValidator, {
    message: "{PATH} this value already exists in our database"
});

module.exports = mongoose.model("Users", UserSchema);