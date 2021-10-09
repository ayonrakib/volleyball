const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../db');
const User = require('../models/User');
const file = require('../../movies.json');
var util = require('util');
var url = require('url');
var http = require('http');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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

router.post('/authenticate', getUserWithEmail, async (req, res, next)=>{
    var email = req.body.email;
    var password = req.body.password;
    console.log("authenticate url is called");
    // console.log(req);
    console.log("body of request is: ",req.body);
    console.log("email is: ",req.body.email);
    console.log("password is: ",req.body.password);
    try {
        var user = await res.user;
        var isUserAuthenticated = bcrypt.compareSync(password, res.user.password);
        console.log("user authenticated?: ",isUserAuthenticated)
    } catch (error) {
        console.log(error);
    }
    // try {
    //     bcrypt.genSalt().then((salt) => {console.log("salt: ",salt)}).catch((error)=>{throw new Error(error)});
    // } catch (error) {
    //     alert(error);
    // }

    // for(let property in req.body){
    //     console.log(property);
    // }
    
    if((email != "") && (password != "")){
        if(authenticate(email, password)){
            console.log("authenticated!");
            // res.send("authenticated!");
            res.redirect('/home');
        }
        else{
            console.log("not authenticated!");
            res.send("not authenticated!");
        }
    }
    // console.log("type of req body is: ", typeof req.body);

})

router.get('/create-user', async (req,res,next)=>{
    console.log("visited create user");
    const salt = bcrypt.genSaltSync(10);
    console.log("salt: ",salt);

    const hashedPassword = bcrypt.hashSync("password",salt);
    console.log("hashed pass: ",hashedPassword);
    const saltRounds = 10;
    const user = new User({
        firstName: "Rakib",
        lastName: "Ayon",
        email: "rakib@gmail.com",
        password: hashedPassword,
        role: "admin"
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.use('/delete-user',getUserWithEmail, async (req, res, next)=>{
    console.log("delete user visited");

    var queryString = url.parse(req.url, true);  
    // console.log(queryString);
    console.log("path: ",queryString.path);
    console.log("pathname: ",queryString.pathname);
    console.log("id: ",req.query.id);
    console.log("name: ",req.query.name);
    try {
        await res.user.remove();
        res.send({ message: `deleted user` });
    } catch (error) {
        console.log("user not found")
        res.send({ message: `user not found` });
    }
})

router.use('/update-user', getUserWithEmail, async (req, res, next)=>{
    var queryString = url.parse(req.url, true);  
    // console.log(queryString);
    console.log("path: ",queryString.path);
    console.log("pathname: ",queryString.pathname);
    console.log("id: ",req.query.id);
    console.log("email: ",req.query.email);
    console.log("firstName: ",queryString.query.firstName);
    res.send("visited update user") ;
    console.log("res.user = ",res.user);
    if((req.query.email != null) && (queryString.query.firstName != null)){
        res.user.firstName = queryString.query.firstName;
    }
    const updatedUser = await res.user.save()
    .catch(error => res.status(400).json({message: "user could not be updated"}))
    .then( () => res.json(updatedUser));
        
})

async function getUser(req, res, next){
    var queryString = url.parse(req.url, true);
    try {
        var user = await User.findById(queryString.query.id).catch(error => console.log(error));
        console.log("the user is: ",user);
    } catch (error) {
        console.log("user not found in get user method");
    }
    res.user = user;
    next();
}

async function getUserWithEmail(req,res,next){
    var queryString = url.parse(req.url, true);
    var email = req.body.email;
    // console.log("email in getUserWithEmail: ",email);
    // console.log("query string email: ",queryString.query.email);
    if (email != undefined) {
        email = email;
    } else {
        email = queryString.query.email;
    }
    try {
        var user = await User.findOne({email: email}).catch(error => console.log(error));
        if(user !== null){
            console.log("found one user with findone: ",user);
        }
    } catch (error) {
        console.log("found no user with findone");
    }
    res.user = user;
    next();
}

function authenticate(email, password){
    return true;
}
module.exports = router;