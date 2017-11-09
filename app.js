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

app.listen(PORT, () => {
    console.log(`${new Date()}: Server listening on port ${PORT}`);
});
