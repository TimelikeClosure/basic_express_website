"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.listen(PORT, () => {
    console.log(`${new Date()}: Server listening on port ${PORT}`);
});
