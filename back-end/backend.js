var http = require('http');
var fs = require('fs');
var file = require('./movies.json');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'))
const router = express.Router();
require('dotenv').config();
const db = require('../back-end/db');
var routerFile = require('../back-end/routers/router');
var cors = require('cors');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

const User = require('../back-end/models/User');
const { use } = require('../back-end/routers/router');

console.log("hello world"); 

app.use('/',routerFile);

// get all users
app.use('/get-users',routerFile);
app.use('/authenticate', routerFile);
app.use('/home',routerFile);

app.listen(8080);