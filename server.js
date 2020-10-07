const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { mongoURI } = require('./config/keys');

const contactForms = require('./routes/api/contactForms');
const sms = require('./routes/api/sms');


const app = express();
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;

mongoose.connect(db)
    .then(() => console.log('database connected'))
    .catch(err => console.log(err));

app.use('/api/contactforms', contactForms);
app.use('/api', sms);

const port =  process.env.PORT || 5000;

app.listen(port, () => console.log(`server connected on port ${port}`))