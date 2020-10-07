const express = require('express');
const router = express.Router();

const ContactForm = require('../../models/ContactForm');


function compare(a, b) {
    if (+a < +b)
        return 1;
    if (+a > +b)
        return -1;
    return 0;
}

// task 4
arrangeNumber = (number) => {
    let formatted = number;
    let intoArray = [];
    if (number[0] === '+')
        formatted = number.substring(1)
    intoArray = formatted.match(/.{1,2}/g);
    intoArray.sort(compare);
    console.log('The largest number for ', number, ' is: ', intoArray.join(''))
}

// POST api/contactforms
router.post('/', (req, res) => {
    const newForm = new ContactForm({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        shouldAddToNewsletter: req.body.shouldAddToNewsletter
    });
    newForm.save()
        .then((item => {

            return res.json(item);
        }))
})

// GET api/contactforms (task 2)
router.get('/', (req, res) => {
    ContactForm.find()
        .sort({ email: 1 })
        .then(items => {
            // this is task 1
            items.map(ele => {
                if (ele.shouldAddToNewsletter) console.log(ele);
                if (ele.phone_number) arrangeNumber(ele.phone_number);
            });
            // end of task 1
            return res.json(items)
        })
        .catch(err => console.log(err))
})


module.exports = router;
