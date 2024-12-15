const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    numberOfTravelers: { type: Number, required: true },
    specialRequests: { type: String, default: 'None' },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
