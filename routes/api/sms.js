const express = require('express');
const router = express.Router();

const ContactForm = require('../../models/ContactForm');

const accountSid = 'AC71b76fb89036b6a96c3c76b435197f77';
const authToken = 'cebb169959b84761aef7aa14ddff4294';
const client = require('twilio')(accountSid, authToken);

sendSms = (body, to) => {
    // IMPORTANT! the phone number is not verified so it will trigger an error that says please verify the number
    client.messages
        .create({
            body: body,
            from: '+19705162166',
            to: to
        })
        .then(message => console.log("message sent! ", message))
        .catch(err => console.log("message error: ", err))
}

// POST api/send-sms (task 3)
router.post('/send-sms', (req, res) => {
    ContactForm.find()
        .sort({ email: 1 })
        .then(items => {
            //send sms to all those who provided a phone number
            items.map(ele => {
                if (ele.phone_number) {
                    let body = `Hi ${ele.name}`;
                    sendSms(body, ele.phone_number.trim());
                }
            })
            return res.json(items)
        })
        .catch(err => console.log(err))
})


module.exports = router;
