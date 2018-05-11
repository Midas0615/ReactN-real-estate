const mongoose = require('mongoose');

const UserMdlSchema = mongoose.Schema({
    name: {
        type: String
    },
    nickname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    picture: {
        type: String,
        default: ''
    },
    userId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const User = module.exports = mongoose.model('Users', UserMdlSchema);