var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    name: {
        type: String
    }
});

module.exports = mongoose.model('Users', userSchema);