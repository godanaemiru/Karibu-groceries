const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    saleType: { type: String, required: true, enum: ['Cash', 'Credit'] },
    produceName: { type: String, required: true },
    tonnage: { type: Number, required: true },
    amount: { type: Number, required: true, min: 10000 }, // Min 5 digits
    salesAgentName: { type: String, required: true, minlength: 2 },
    date: { type: Date, default: Date.now },
    time: { type: String },
    
    // Cash Sale Specific
    buyerName: { type: String, minlength: 2 }, // Alpha-numeric check handled in controller/validation

    // Credit Sale Specific
    buyerNIN: { type: String }, // NIN Validation regex in controller
    location: { type: String, minlength: 2 },
    contact: { type: String },
    dueDate: { type: Date },
    dispatchDate: { type: Date },
    produceType: { type: String }
});

module.exports = mongoose.model('Sale', saleSchema);