const path = require('path');
const express = require('express');
const endPoints = require('./endPoints');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config.js').config;
const DBconfig = require('../DB/config.js').config;
const router = express.Router();
const app = express();
const cookieParser = require('cookie-parser');

mongoose.connect(DBconfig.dbUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
});
nunjucks.configure(path.join(__dirname, '../client/dist'), {
    autoescape: true,
    cache: false,
    express: app,
});

app.use(
    express.static(path.join(__dirname, '../client/dist')),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cookieParser("sE^sjJ@a\\|&dWJD"),
    async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Data-User-Type");
        next();
    }
);

app.use(endPoints(router));
app.use('*', (req, res, next) => {res.render('index.html')})
app.listen(config.port);

module.exports.server = app;

console.log(`Space-chat server started on ${config.port}!`);