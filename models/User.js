const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // In production, hash this!
    role: { type: String, required: true, enum: ['Manager', 'Sales Agent'] }
});

module.exports = mongoose.model('User', userSchema);