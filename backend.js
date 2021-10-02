var http = require('http');
var fs = require('fs');
var file = require('./movies.json');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('./db');
var routerFile = require('./src/routers/router');

const app = express();

const User = require('./src/models/User');
const { use } = require('./src/routers/router');

console.log("hello world"); 

app.use('/',routerFile);

// get all users
app.use('/get-users',routerFile);
app.use('/get-data', routerFile);

app.listen(8080);