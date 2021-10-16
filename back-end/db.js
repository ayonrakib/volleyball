const express = require('express');
const mongoose = require('mongoose');
var http = require('http');
var fs = require('fs');
var file = require('./movies.json');
require('dotenv').config();
const router = express.Router();

const app = express();

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });

const db = mongoose.connection;

db.on("open", () => console.log("connection established"));
db.on("error", () => console.log("failed to connect to db"));

http.createServer(function(req, res) {
    res.write("db file executed");
    res.end();
}).listen(8000);