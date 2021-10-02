const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../db');
const User = require('../models/User');
const file = require('../../movies.json');
var util = require('util');

// get all users

router.get('/', (req, res)=>{
    res.send(file);
    res.end();
})

router.get('/get-users', async (req,res) => {
    try {
        const users = await User.find();
        res.send(users);
        res.end(); 
    } catch (error) {
        res.status(500).send("Users not found");
    }
})

router.get('/get-data', (req, res, next)=>{
    res.send(req.body);
    console.log(req.body);
})

module.exports = router;