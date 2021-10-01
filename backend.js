var http = require('http');
var fs = require('fs');
var file = require('./movies.json');
var cors = require('cors');

console.log("hello world");
http.createServer(function(req,res){
    fs.readFile("./movies.json","utf-8",(err,jsonString)=>{
        if(err){
            console.log("the error is: ",err);
            return;
        }
        res.write(jsonString);
        res.end();
    })
}).listen(8080)