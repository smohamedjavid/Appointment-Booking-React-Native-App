var mongoose = require('mongoose')

var bookingSchema = mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    alumni_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date
    },
    time_slot: {
        type: String
    },
    booking_status: {
        type: String,
        default: 'pending'
    },
    student_name: {
        type: String
    },
    student_email: {
        type: String
    },
    alumni_name: {
        type: String
    }
});

module.exports = mongoose.model('Bookings', bookingSchema);