"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const PORT = 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact'});
});

app.post('/contact/send', (req, res) => {
    const mailConfig = Object.freeze(require('./config/contact_form'));
    const transporter = nodeMailer.createTransport(mailConfig.auth);

    const mailOptions = Object.assign({}, mailConfig.options, {
        subject: "Website Submission",
        text: `You have a submission with the following details...\nName: ${req.body.name}\nEmail: ${req.body.email}\nMessage:\n    ${req.body.message}</li></ul>`,
        html: `<ul>You have a submission with the following details...<li>Name: ${req.body.name}</li><li>Email: ${req.body.email}</li><li>Message: <p>${req.body.message}</p></li></ul>`
    });

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            console.log(`Message Sent: ${info.response}`);
            res.send(JSON.stringify(info));
        }
    });
});

app.listen(PORT, () => {
    console.log(`${new Date()}: Server listening on port ${PORT}`);
});
