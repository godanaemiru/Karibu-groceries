const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema({
    produceName: { type: String, required: true, match: /^[a-zA-Z0-9 ]+$/ }, // Alpha-numeric
    produceType: { type: String, required: true, minlength: 2, match: /^[a-zA-Z ]+$/ }, // Alphabetic only
    date: { type: Date, required: true },
    time: { type: String, required: true },
    tonnage: { type: Number, required: true, min: 100 }, // Min 3 digits (100+)
    cost: { type: Number, required: true, min: 10000 }, // Min 5 digits (10000+)
    dealerName: { type: String, required: true, minlength: 2, match: /^[a-zA-Z0-9 ]+$/ },
    branch: { type: String, required: true, enum: ['Maganjo', 'Matugga'] },
    contact: { type: String, required: true, match: /^\+?[0-9]{10,15}$/ },
    sellingPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Procurement', procurementSchema);