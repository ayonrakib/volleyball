const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../db');
const User = require('../models/User');
const file = require('../../movies.json');
var util = require('util');
var url = require('url');
var http = require('http');

// get all users

router.get('/', (req, res)=>{
    res.send(file);
    res.end();
})

router.get('/get-users', async (req,res) => {
    var adr = 'http://localhost:8080/a/default.htm?year=2017&month=february';
    var q = url.parse(adr, true);

    console.log(q.host); //returns 'localhost:8080'
    console.log(q.pathname); //returns '/default.htm'
    console.log(q.search); //returns '?year=2017&month=february'

    var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
    console.log(qdata)
    console.log(qdata.month); //returns 'february'
    var options = {
        host: 'google.com',
        path: '/'
    }
    var request = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            console.log(data);
    
        });
    });
    request.end();
    try {
        const users = await User.find();
        res.send(users);
        res.end(); 
    } catch (error) {
        res.status(500).send("Users not found");
    }
})

router.post('/get-data', (req, res, next)=>{
    console.log("get data url is called");
    // console.log(req);
    console.log("body of request is: ",req.body);
    console.log("type of req body is: ", typeof req.body);
    for(let property in req.body){
        console.log(property);
    }

    res.send(true);
})

router.get('/create-user', async (req,res,next)=>{
    console.log("visited create user");
    const user = new User({
        firstName: "Rakib",
        lastName: "Ayon",
        email: "ayon@gmail.com",
        password: "password",
        role: "admin"
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.get('/delete-user/:id', getUser, async (req, res, next)=>{
    console.log("delete user visited");
    try {
        await res.user.remove();
        res.send({ message: "deleted user" });
    } catch (error) {
        console.log("user not found")
        res.send({ message: "user not found" });
    }
})

function getUser(){
    return "";
}
module.exports = router;