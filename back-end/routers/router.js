const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// require('../db');
const Poll = require('../models/Poll');
const User = require('../models/User');
const mariadbUser = require("../mariadb-models/User");
const file = require('../movies.json');
const ApiError = require("../utils/exception").ApiError;
const Response = require("../utils/rest");
const GetErrorFormat = require("../utils/error");

const multer = require('multer');
var util = require('util');
var url = require('url');
var http = require('http');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { session } = require('passport');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var _ = require("lodash");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './temp-images/')
    },
    filename: function (req, file, cb) {
      var fileName = file.originalname.slice(0,file.originalname.indexOf("."));
      var randomString = crypto.randomBytes(20).toString('hex');
      console.log("random string is: ",randomString)
      req.body.name = fileName+"-"+randomString+".png"
      cb(null, req.body.name)
    }
  })

const upload = multer({ storage: storage })


function renameProfilePicture(session, req){
  fs.rename(`./temp-images/${req.body.name}`,`./images/${session}.png`, function(error, data){
    if(error){
      console.log("error in renaming: ",error)
    }
  })
  return true;
}

router.get('/', (req, res)=>{
    // console.log("reached / url");
    res.send(file);
    res.end();
})

router.put('/put-method', (req, res) => {
    console.log("put method input is: ",req.body.name);
    res.send("Put working successfully!")
})


// get all users of mariadb
// get method
// input: nothing, returns JSOn of all users of mariadb
// method:
//      1. no middleware
//      2. url: get-users-mariadb
//      3. DB theke sob user obj read kore nibo
//      4. empty user list
//      5. user objects er sob user object er jonno:
//          5.1. user list e user obj push
//      6. return users list
router.get("/get-users-mariadb", async (req, res) => {
    console.log("came in get-users-mariadb url!");
    const userObjectsFromDatabase = await mariadbUser.findAll();
    var users = [];
    for(var index = 0; index < userObjectsFromDatabase.length; index++){
        users.push(userObjectsFromDatabase[index].dataValues)
    }
    res.send(users);
    res.end();
})

// hash password
// input: plain text password
// return: hashed password
// method:
//      1. salt banabo
//      2. password salt shoho hash korbo
//      3. return hashed password
function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}


// login-mariadb
// post method
// middleware: get user with email from mariadb
// method:
//      1. if middleware response user is unavailable:
//          1.1. return false and error message as "invalid email or password! Please tyr again!"
//      2. validate with mariadb
//      3. if authenticated:
//          3.1. create a session
//          3.2. save the session on the mariadb for the user with input email
//          3.3. if error on saving in db:
//              3.3.1. return response with false and say that please try logging in again!
//          3.4. return response with the session and no error message
//      4. if not authenticated:
//          4.1. return false and error message as "invalid email or password! Please tyr again!"
router.post("/login-mariadb", getUserWithEmailFromMariadb, async (req, res) => {
    console.log("middleware response for login url: ",res.error)
    if((res.error) || (!(res.foundUser)) ){
        console.log("user was not found!")
        res.send({
            data: null,
            error:{
                errorCode: 600,
                errorMessage: "Please insert valid email or password!"
            }
        });
        res.end();
    }
    else{
        if(bcrypt.compareSync(req.body.password, res.user.password)){
            console.log("user authenticated!");
            let session = getSession();
            res.user.session = session;
            await res.user.save();
            res.send({
                data: session,
                error: null
            });
            res.end();
            return;
        }
        else{
            console.log("user not authenticated!");
            res.send({
                data: null,
                error:{
                    errorCode: 600,
                    errorMessage: "Please insert valid email or password!"
                }
            });
            res.end();
            return;
        }
    }
})

// register-mariadb
// post method
// method:
//      1. read data from front end
//      2. check if email exists in db
//      3. If there is an error:
//          3.1. return the error in the front end
//      4. else if the user exists:
//          4.1. return response that user exists
//      5. else (the user does not exist):
//          5.1. read user data from API
//          5.2. create the user in db
//          5.3. If there is an error creating the user:
//              5.3.1. return false to the front end
//          5.4. return the session to front end

router.post("/register-mariadb", getUserWithEmailFromMariadb, async (req, res) => {
    console.log("arrived in register-mariadb url!");
    console.log("response user obj is: ",res.foundUser);
    if(res.foundUser !== false){
        const error = GetErrorFormat(200, "User already exists!")
        console.log("error is: ", error) 
        res.send({
            data: null,
            error: error
        })
        res.end();
        return;
    }
    else if(!(res.foundUser)){
        // console.log("req dict is: ",req.body);
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var hashedPassword = hashPassword(password);
        console.log("hashed password in creating user in register-mariadb url is: ",hashedPassword)
        var session = getSession();
        try {
            var newUser = await mariadbUser.create({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword, session: session })
        } catch (e) {
            console.error(e)
            const error = GetErrorFormat(400, "The user could not be created! Please try again!");
            res.send({
                data: null,
                error: error
            })
            return;
        }
        res.send({
            data: session,
            error: null
        })
        res.end();
        return;
    }
})


router.get('/get-users', async (req,res) => {
    console.log("came in get-users url!")
    var adr = 'http://localhost:8080/a/default.htm?year=2017&month=february';
    var q = url.parse(adr, true);

    // console.log(q.host); //returns 'localhost:8080'
    // console.log(q.pathname); //returns '/default.htm'
    // console.log(q.search); //returns '?year=2017&month=february'
    

    var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
    // console.log(qdata)
    // console.log(qdata.month); //returns 'february'
    var options = {
        host: 'google.com',
        path: '/'
    }
    // console.log("random string: ",getSession())
    try {
        const users = await User.find();
        res.send(users);
        res.end(); 
    } catch (error) {
        res.status(500).send("Users not found");
    }
})

router.post('/authenticate', getUserWithEmail, (req, res, next)=>{
    console.log("came in authenticate method!")
    var email = req.body.email;
    var password = req.body.password;
    // console.log("authenticate url is called");
    // console.log("body of request is: ",req.body);
    // console.log("email is: ",req.body.email);
    // console.log("password is: ",req.body.password);
    if(res.user === null){
        res.send({
            data: false,
            error: ""
        });
    }
    else if((email != "") && (password != "")){
        if(authenticate(email, password, res.user)){
            // console.log("authenticated in the nodejs authenticate url!");
            var sessionId = getSession();
            if (assignSessionToUser(res.user, sessionId)) {
                // console.log("users session is: ",res.user.session);
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
            // console.log("not authenticated in the nodejs authenticate url!");
            res.send({
                data: false,
                error: ""
            });
        }
    }
    // for(let property in req.body){
    //     // console.log(property);
    // }
    
})

router.post('/register', upload.any(), async (req, res, next)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    // console.log("first name is: ",firstName);
    // console.log("last name is: ",lastName);
    // console.log("email is: ",email);
    // console.log("passowrd is: ",password);
    // console.log("file is: ", req.body.profilePicture)
    const salt = bcrypt.genSaltSync(10);
    // console.log("salt: ",salt);
    const hashedPassword = bcrypt.hashSync(password,salt);
    // console.log("hashed pass: ",hashedPassword);
    const saltRounds = 10;
    var session = getSession();
    varisPictureRenamed = renameProfilePicture(session, req);
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        session: session,
        image: `${session}.png`,
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
    // console.log("delete user visited");

    var queryString = url.parse(req.url, true);  
    // // console.log(queryString);
    // console.log("path: ",queryString.path);
    // console.log("pathname: ",queryString.pathname);
    // console.log("id: ",req.query.id);
    // console.log("name: ",req.query.name);
    try {
        await res.user.remove();
        res.send({ message: `deleted user` });
    } catch (error) {
        // console.log("user not found")
        res.send({ message: `user not found` });
    }
})

router.use('/update-user', getUserWithEmail, async (req, res, next)=>{
    var queryString = url.parse(req.url, true);  
    // // console.log(queryString);
    // console.log("path: ",queryString.path);
    // console.log("pathname: ",queryString.pathname);
    // console.log("id: ",req.query.id);
    // console.log("email: ",req.query.email);
    // console.log("firstName: ",queryString.query.firstName);
    res.send("visited update user") ;
    // console.log("res.user = ",res.user);
    if((req.query.email != null) && (queryString.query.firstName != null)){
        res.user.firstName = queryString.query.firstName;
    }
    const updatedUser = await res.user.save()
    .catch(error => res.status(400).json({message: "user could not be updated"}))
    .then( () => res.json(updatedUser));
        
})


router.post('/validate', getUserWithSession, (req, res, next)=>{
    // console.log("came in validate url");
    // console.log("user in validate url is: ",res.user)
    // // res.send(true)
    // // console.log(res.user)
    if(res.user){
        res.send(true);
    }
    else{
        res.send(false)
    }
})


// validate-cookie-mariadb
// input: url, middleware: get user with session from amriadb
// return: true if valid session, false if not
// method:
//      1. if user found:
//          1.1. return true
//      2. else:
//          2.1. return false
router.post("/validate-cookie-mariadb", getUserWithSessionFromMariadb, (req, res) => {
    console.log("came in validate-cookie-mariadb url!")
    console.log("req.body in validate-cookie-mariadb is: ",req.body)
    console.log("session in validate-cookie-mariadb is: ",req.body.data)
    
    if (res.user === false) {

        const error = GetErrorFormat(1500, "user was not found!")
        res.send({
            data: null,
            error: error
        })

    } else {
        
        res.send({
            data: true,
            error: null
        })

    }
    res.end();
    return;
})


router.post('/logout',getUserWithSession, (req, res, next)=>{
    // console.log ("came in logout url");

    if (assignSessionToUser(res.user,"")) {
        // console.log("user session has been cleared");
        res.send({
            data: true,
            error: ""
        })
    } else {
        // console.log("user could not be found in getUserWithSession");
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
    // console.log("came inside create poll");
    const poll = new Poll({
        yesVoters:[],
        noVoters: [],
        maybeVoters: []
    });
    // console.log("poll object is: ",poll)
    try{
        const newPoll = await poll.save();
        res.send({
            data: newPoll,
            error: ""
        })
    }catch(error){
        // console.log(error)
        res.send({
            data: false,
            error:{
                errorCode: 401,
                errorMessage: "Failed to create poll"
            }
        })
    }
})

router.get('/get-all-polls', async (req, res, next) => {
    // console.log("came in get all polls")
    try {
        var polls = await Poll.find({});
        // console.log("all polls are: ",polls)
    } catch (error) {
        // console.log("error is: ",error)
    }
    res.send({
        data: polls,
        errorMessage: ""
    })
})

router.post('/delete-poll', getPoll, async (req, res, next) => {
    // console.log("came in delete poll")
    try{
        await res.poll.remove();
        res.send({
            data: true,
            error: ""
        })
    }
    catch(error){
        // console.log("poll not found")
        res.send({
            data: false,
            error:{
                errorCode: 402,
                errorMessage: "Poll could not be deleted"
            }
        })
    }
})

router.post('/show-voters', getPoll, async (req,res) => {
    // console.log("poll found from getPoll middleware in show-voters is: ",res.poll)
    if (res.poll === null){
        res.send({
            data: false,
            error: {
                errorCode: 1000,
                errorMessage: "Poll was not found!"
            }
        })
    }
    else{
        let yesVoters = await getYesVoters(res.poll);
        // console.log("yes voters are: ",yesVoters);
        let noVoters = await getNoVoters(res.poll);
        // console.log("no voters are: ",noVoters);
        let maybeVoters = await getMaybeVoters(res.poll);
        // console.log("maybe voters are: ",maybeVoters);
        res.send({
            data:{
                yesVoters: yesVoters,
                noVoters: noVoters,
                maybeVoters: maybeVoters
            },
            error: ""
        })
    }
    
})

router.post('/get-user-with-poll-choice', async (req, res, next) => {
    var session = req.body.session;
    // console.log("session is get-user-with-poll-choice is: ",req.body.session);
    try {
        const user = await User.findOne({session: session});
        // console.log("user in get-user-with-poll-choice url is: ",user)
        res.send(user);
    } catch (error) {
        res.send(null)
    }
})

router.post('/get-profile-details',getUserWithSession, (req, res) => {
    // console.log("session in get-profile-details url is: ",req.body.session)
    // console.log("user in get-profile-details url is: ",res.user)
    res.send({
        data: {
            firstName: res.user.firstName,
            lastName: res.user.lastName,
            email: res.user.email
        }
    })
})

router.post('/save-profile-details',getUserWithSession, async (req, res)=>{
    // console.log("firstName in save-profile-details is: ",req.body.firstName);
    // console.log("lastName in save-profile-details is: ",req.body.lastName);
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    if((firstName === "") && (lastName === "")){
        res.send({
            data : false,
            message : {
                errorCode : 500,
                errorMessage : "Please insert a valid first and last name!"
            }
        })
    }
    else if(firstName === ""){
        res.send({
            data: false,
            message: {
                errorCode: 1000,
                errorMessage: "Please insert a valid first name!"
            }
        })
    }
    else if(lastName === ""){
        res.send({
            data: false,
            message: {
                errorCode: 2000,
                errorMessage: "Please insert a valid last name!"
            }
        })
    }
    else{
        res.user.firstName = firstName;
        res.user.lastName = lastName;
        const updatedUser = await res.user.save().catch(error => console.log(error));
        if((updatedUser.firstName === firstName) && (updatedUser.lastName === lastName)){
            res.send({
                data:true,
                message : ""
            })
        }
        else{
            res.send({
                data:false,
                message : {
                    errorCode: 3000,
                    errorMessage: "User could not be updated!"
                }
            })
        }
    }

})

// save selection in poll db
// input: req, res, next
// return: true if saved in db, false if not
// method:
//      1. req theke current poll id ber korbo
//      2. req theke clicked poll button id ber korbo
//      3. poll button id er kon index e - ase sheita ber korbo
//      4. poll button id er 0 theke - index porjonto kete nibo
//      5. poll button id to poll choice dict banabo, key hobe kete newa string and value hobe yes no maybe
//      6. browser er cookie read korbo and check korbo kon user
//      7. poll id theke poll obj khuje ber korbo
//      8. jodi user ba poll khuje na pai, error return korbo and message pathabo
//      9. db te oi poll id theke poll khuje ber korbo and oi user er id diye yes/no/maybe save korbo
//      10. true return korbo client ke

router.post('/save-selection-in-poll-database', getUserWithSession, async (req, res, next) => {
    // console.log("came in save-selection-in-poll-database url")
    
    var currentPollId = req.body.id;
    // console.log("parents class is: ",currentPollId)
    var pollButtonId = req.body.pollOption;
    // console.log("poll option is: ",pollButtonId)
    var index = pollButtonId.search("-");
    // console.log("- index is: ",index)
    var pollChoice = pollButtonId.slice(0,index);
    // console.log("poll choice is: ",pollChoice)
    var pollIdToChoice = {
        "yesButton" : "yesVoters",
        "noButton" :"noVoters",
        "maybeButton" : "maybeVoters"
    }
    var user = res.user;
    // console.log("user is: ",user)
    var selectedPollChoice = pollIdToChoice[pollChoice];
    // console.log("selected poll choice: ", selectedPollChoice)
    var poll = await Poll.findOne({_id:currentPollId});
    // console.log("the poll is: ",poll)
    if((user === null) || (poll === null)){
        res.send({
            data: false,
            error:{
                errorCode: 1000,
                errorMessage: "User was not found"
            }
        })
    }
    if(selectedPollChoice === "yesVoters"){
        deleteNoVote(user._id, currentPollId)
        deleteMaybeVote(user._id, currentPollId)
        try{
            await Poll.updateOne({
                _id: currentPollId
            },
            {
                $addToSet:{yesVoters:user._id}
            })
            res.send({
                data: true,
                error: ""
            })
        }
        catch(error){
            // console.log(error)
        }
    }
    else if(selectedPollChoice === "noVoters"){
        deleteYesVote(user._id, currentPollId)
        deleteMaybeVote(user._id, currentPollId)
        try{
            await Poll.updateOne({
                _id: currentPollId
            },
            {
                $addToSet:{noVoters:user._id}
            })
            res.send({
                data: true,
                error: ""
            })
        }
        catch(error){
            // console.log(error)
        }
    }
    else if(selectedPollChoice === "maybeVoters"){
        deleteYesVote(user._id, currentPollId)
        deleteNoVote(user._id, currentPollId)
        try{
            await Poll.updateOne({
                _id: currentPollId
            },
            {
                $addToSet:{maybeVoters:user._id}
            })
            res.send({
                data: true,
                error: ""
            })
        }
        catch(error){
            // console.log(error)
        }
    }
})


// get profile picture
// input: nothing
// return: profile picture name as json if found, otherwise null
// method:
//      1. session theke user khuje ber korbo
//      2. jodi user khuje na pai:
//          2.1. JSOn return korbo null
//      3. 

// delete yes vote for user
// input: voter id and currentPollId
// return: nothing, just delete the vote
// method:
//      1. poll db er yes vote array te khujbo ei voter id ase kina
//      2. jodi thake, delete kore dibo entry
//      3. jodi error hoy:
//          3.1. log korbo error

router.get('/get-profile-picture-url', (req, res) => {
    console.log("came in get-profile-picture-url method");
    res.send({
        data: "http://localhost:8080/images/volleyball.png"
    })
})

router.post('/save-profile-picture', upload.single('profilePicture'), (req, res) => {
    console.log("arrived in save-profile-picutre url!");
    console.log("the file name with which the file was saved in save-profile-picture url is: ",req.body.name)
    res.send({
        data: true,
        message: ""
    })
})

async function deleteYesVote(voterId, currentPollId){
    try {
        await Poll.updateOne(
            {
                _id : currentPollId
            },
            {
                $pull:{
                    yesVoters: voterId
                }
            }
            )
    } catch (error) {
        // console.log("error is: ",error)
    }
}

// delete no vote for user
// input: voter id
// return: nothing, just delete the vote
// method:
//      1. poll db er no vote array te khujbo ei voter id ase kina
//      2. jodi thake, delete kore dibo entry
//      3. jodi error hoy:
//          3.1. log korbo error
async function deleteNoVote(voterId, currentPollId){
    try {
        await Poll.updateOne(
            {
                _id : currentPollId
            },
            {
                $pull:{
                    noVoters: voterId
                }
            }
            )
    } catch (error) {
        // console.log("error is: ",error)
    }
}

// delete maybe vote for user
// input: voter id and currentPollId
// return: nothing, just delete the vote
// method:
//      1. poll db er maybe vote array te khujbo ei voter id ase kina
//      2. jodi thake, delete kore dibo entry
//      3. jodi error hoy:
//          3.1. log korbo error
async function deleteMaybeVote(voterId, currentPollId){
    try {
        await Poll.updateOne(
            {
                _id : currentPollId
            },
            {
                $pull:{
                    maybeVoters: voterId
                }
            }
            )
    } catch (error) {
        // console.log("error is: ",error)
    }
}
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
        var poll = await Poll.findOne({_id: id});
        console.log("current poll in getPoll middleware is: ", poll)
    }
    catch(error){
        // console.log("found no poll with id "+id)
        console.error(error)
    }
    res.poll = poll;
    next()
}


async function getYesVoters(poll){
    let users = [];
    for(let index = 0; index < poll.yesVoters.length; index++){
        let user = await getUserWithId(poll.yesVoters[index])
        users.push(`${user.firstName + ' ' + user.lastName}`)
    }
    // console.log("users are: ",users)
    return users;
}


async function getNoVoters(poll){
    let users = [];
    for(let index = 0; index < poll.noVoters.length; index++){
        let user = await getUserWithId(poll.noVoters[index])
        users.push(`${user.firstName + ' ' + user.lastName}`)
    }
    // console.log("users are: ",users)
    return users;
}


async function getMaybeVoters(poll){
    let users = [];
    for(let index = 0; index < poll.maybeVoters.length; index++){
        let user = await getUserWithId(poll.maybeVoters[index])
        users.push(`${user.firstName + ' ' + user.lastName}`)
    }
    // console.log("users are: ",users)
    return users;
}


async function getUserWithId(id){
    try {
        var user = await User.findById(id);
    } catch (error) {
        console.error(error)
    }
    return user;
}


async function getUser(req, res, next){
    var queryString = url.parse(req.url, true);
    try {
        var user = await User.findById(queryString.query.id).catch(error => console.log(error));
        // console.log("the user is: ",user);
    } catch (error) {
        // console.log("user not found in get user method");
    }
    res.user = user;
    next();
}

async function getUserWithSession(req,res,next){
    var session = req.body.session;
    // console.log("session in getUserWithSession is: ",session);
    try {
        var user = await User.findOne({session: session});
        // console.log("user in getUserWithSession is: ",user);
        if(user === null){
            res.user = null;
        }
        else{
            res.user = user;
        }
        
    } catch (error) {
        // console.log(error)
    }
    next()
}


// get user with session from mariadb
// input: req, res, next
// return: nothing
// method:
//      1. search for any user in mariadb with user.session = session from request
//      2. if user found:
//          2.1. response.user = user
//          2.2. call next middleware
//          2.3. return
//      3. response.user = false
//      4. call next middleware
//      5. return
async function getUserWithSessionFromMariadb(req, res, next){
    console.log("came in getUserWithSessionFromMariadb method!")
    console.log("req.body in getUserWithSessionFromMariadb method is: ",req.body)
    console.log("req.body.data in getUserWithSessionFromMariadb method is: ",req.body.data)
    // console.log("req.body.data.session in getUserWithSessionFromMariadb method is: ",req.body.data.session)
    if (req.body.data === undefined) {

        res.user = false;
        next();
        return;

    }
    const user = await mariadbUser.findAll({
        where: {
            session: req.body.data
        }
    });
    console.log("user in getUserWithSessionFromMariadb method is: ",user)
    if(_.isEqual(user, [])){
        // console.log("user wasnt found in getUserWithSessionFromMariadb method!")
        res.user = false;
    }
    else{
        res.user = user[0];
    }
    next();
    return;
}


async function getUserWithEmail(req,res,next){
    console.log("came to getUserWithEmail function!")
    var queryString = url.parse(req.url, true);
    var email = req.body.email;
    // // console.log("email in getUserWithEmail: ",email);
    // // console.log("query string email: ",queryString.query.email);
    if (email != undefined) {
        email = email;
    } else {
        email = queryString.query.email;
    }
    // console.log("email in getUserWithEmail method is: ",email)
    try {
        var user = await User.findOne({email: email}).catch(error => console.log(error));
        // console.log("user in getUserWithEmail is: ",user)
        if(user !== null){
            // console.log("found one user with findone in getUserWithEmail method: ",user);
        }
        else if(user == null){
            res.user = null;
            next();
        }
    } catch (error) {
        // console.log("found no user with findone");
    }
    res.user = user;
    next();
}


// get user with email from mariadb
// input: request, response, next middleware
// return: user obj if found, null if not
// method:
//      1. db theke user search korbo with email = input email
//      2. if user found:
//          2.1. set response.user = user obj
//          2.2. call next middleware
//      3. error hoile:
//          3.1. log korbo error
//          3.2. response er error object set korbo with error code and message "could not save user"

async function getUserWithEmailFromMariadb(req, res, next){
    console.log("came in getUserWithEmailFromMariadb method!")
    console.log("req.body in getUserWithEmailFromMariadb method: ",req.body)
    try {
        var user = await mariadbUser.findOne({ where: {email: req.body.email} });
        console.log("found user in getUserWithEmailFromMariadb method: ",user);
        if(user === null){
            res.foundUser = false;
            next();
        }
        else{
            res.foundUser = true;
            res.user = user;
            next();
        }

    } catch (error) {
        console.error(error);
        res.error = {
            errorCode: 300,
            errorMessage: "User could not be saved!"
        }
    }
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