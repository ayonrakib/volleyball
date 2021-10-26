const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../db');
const Poll = require('../models/Poll');
const User = require('../models/User');
const file = require('../movies.json');
var util = require('util');
var url = require('url');
var http = require('http');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { session } = require('passport');

// get all movies

router.get('/', (req, res)=>{
    console.log("reached / url");
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
    console.log("random string: ",getSession())
    try {
        const users = await User.find();
        res.send(users);
        res.end(); 
    } catch (error) {
        res.status(500).send("Users not found");
    }
})

router.post('/authenticate', getUserWithEmail, (req, res, next)=>{
    var email = req.body.email;
    var password = req.body.password;
    console.log("authenticate url is called");
    console.log("body of request is: ",req.body);
    console.log("email is: ",req.body.email);
    console.log("password is: ",req.body.password);
    if((email != "") && (password != "")){
        if(authenticate(email, password, res.user)){
            console.log("authenticated in the nodejs authenticate url!");
            var sessionId = getSession();
            if (assignSessionToUser(res.user, sessionId)) {
                console.log("users session is: ",res.user.session);
                res.send({
                    data: sessionId,
                    error: ""
                });
            } else {
                res.send({
                    data: false,
                    error: {
                        errorCode: 401,
                        errorMessage: "Could not assign session for user, please try to login again"
                    }
                });
            } 

        }
        else{
            console.log("not authenticated in the nodejs authenticate url!");
            res.send({
                data: false,
                error: ""
            });
        }
    }

    // for(let property in req.body){
    //     console.log(property);
    // }

})

router.post('/register', async (req, res, next)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    console.log("first name is: ",firstName);
    console.log("first name is: ",lastName);
    console.log("first name is: ",email);
    console.log("first name is: ",password);
    const salt = bcrypt.genSaltSync(10);
    console.log("salt: ",salt);
    const hashedPassword = bcrypt.hashSync(password,salt);
    console.log("hashed pass: ",hashedPassword);
    const saltRounds = 10;
    var session = getSession();
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        session: session,
        role: "user"
    });
    try {
        const newUser = await user.save();
        // res.status(201).json(newUser);
        res.send({
            data: session,
            error: ""
        })
    } catch (error) {
        res.send({
            data: false,
            error: {
                errorCode: 400,
                errorMessage: "Could not create user!"
            }
        })
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


router.post('/validate', getUserWithSession, (req, res, next)=>{
    console.log("came in validate url");
    console.log("user in validate url is: ",res.user)
    // // res.send(true)
    // console.log(res.user)
    if(res.user){
        res.send(true);
    }
    else{
        res.send(false)
    }
})

router.post('/logout',getUserWithSession, (req, res, next)=>{
    console.log ("came in logout url");

    if (assignSessionToUser(res.user,"")) {
        console.log("user session has been cleared");
        res.send({
            data: true,
            error: ""
        })
    } else {
        console.log("user could not be found in getUserWithSession");
        res.send({
            data: false,
            error:{
                errorCode: 100,
                errorMessage: "User could not be logged out"
            }
        })
    }
})

router.get('/create-poll', async (req, res, next) => {
    console.log("came inside create poll");
    const poll = new Poll({
        pollId: 1,
        yesVoters:[],
        noVoters: []
    });
    console.log("poll object is: ",poll)
    try{
        const newPoll = await poll.save();
        res.send({
            data: newPoll,
            error: ""
        })
    }catch(error){
        console.log(error)
        res.send({
            data: false,
            error:{
                errorCode: 401,
                errorMessage: "Failed to create poll"
            }
        })
    }
})

router.get('/delete-poll', getPoll, async (req, res, next) => {
    console.log("came in delete poll")
    try{
        await res.poll.remove();
        res.send({
            data: "Poll deleted",
            error: ""
        })
    }
    catch(error){
        console.log("poll not found")
        res.send({
            data: false,
            error:{
                errorCode: 402,
                errorMessage: "Poll could not be deleted"
            }
        })
    }
})

router.post('/get-user-with-poll-choice', async (req, res, next) => {
    var session = req.body.session;
    console.log("session is get-user-with-poll-choice is: ",req.body.session);
    try {
        const user = await User.findOne({session: session});
        console.log("user in get-user-with-poll-choice url is: ",user)
        res.send(user);
    } catch (error) {
        res.send(null)
    }
    
})

router.post('/save-selection-in-poll-database', async (req, res, next) => {
    console.log("came in save-selection-in-poll-database url")
    var user = req.body.user;
    var currentPollId = req.body.id;
    var isChecked = req.body.isChecked;
    if(isChecked){
        try{
            await Poll.updateOne({
                pollId: currentPollId
            },{
                $addToSet: {yesVoters:user.email}
            })
        }
        catch(error){
            console.log("error for yes vote is: ",error)
        }
    }
    else{
        try{
            await Poll.updateOne({
                pollId: currentPollId
            },{
                $addToSet: {noVoters:user.email}
            })
        }
        catch(error){
            console.log("error for no vote is: ",error)
        }
    }
    try{
        await Poll.updateOne({
            pollId: currentPollId
        },{
            $addToSet: {isChecked:user.email}
        })
    }
    catch(error){

    }
    res.send({
        data: true,
        errorMessage: ""
    })
})

async function getPoll(req, res, next){
    var queryString = url.parse(req.url, true);
    var id = req.body.id;
    
    if (id !== undefined) {
        id = id;
    } else {
        id = queryString.query.id;
    }
    console.log("id in getpoll middleware is: ",id)
    try{
        var poll = await Poll.findOne({id: id}).catch(error => console.log(error));
        if(poll !== null){
            console.log("current poll in getPoll middleware is: ", poll)
        }
    }
    catch(error){
        console.log("found no poll with id "+id)
    }
    res.poll = poll;
    next()
}

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

async function getUserWithSession(req,res,next){
    var session = req.body.session;
    console.log("session in getUserWithSession is: ",session);
    try {
        var user = await User.findOne({session: session});
        console.log("user in getUserWithSession is: ",user);
        res.user = user;
    } catch (error) {
        console.log(error)
        res.user = null;
    }
    next()
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

function authenticate(email, password, userFromDatabase){
    if((email === userFromDatabase.email) && (bcrypt.compareSync(password, userFromDatabase.password))){
        return true;
    }
    return false;
}

function getSession(){
    return crypto.randomBytes(20).toString('hex');
}

async function assignSessionToUser(user, session){
    user.session = session;
    try {
        await user.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = router;
// module.exports = getUserWithSession;
// module.exports = getUserWithEmail;