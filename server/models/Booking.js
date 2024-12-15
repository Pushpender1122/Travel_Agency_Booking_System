const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    travelers: Number,
    specialRequests: String,
    packageId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Booking', bookingSchema);
