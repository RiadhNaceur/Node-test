const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactFormSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String
    },
    shouldAddToNewsletter: {
        type: Boolean
    }
})

module.exports = ContactForm = mongoose.model('ContactForm', ContactFormSchema);