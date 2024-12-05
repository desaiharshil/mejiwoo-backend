const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: 'Please provide a valid email',
        },
    },
    password: {
        type: String,
        required: true,
    },

});

const User = mongoose.model('user', UserSchema)
module.exports = User