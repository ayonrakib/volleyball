const sequelize = require('../mariadb');
const User = require("../mariadb-models/User")
const crypto = require('crypto');

class UserController{
    constructor(){

    }
    getSalt(){
        return crypto.randomBytes(16).toString("hex")
    }
    hashPassword (password, salt) {
        if (salt == ""){
            const salt = this.getSalt();
            console.log("salt is: ",salt);
        }
        var hashedPassword = crypto.pbkdf2Sync(password,salt,1000,64,"sha512").toString("hex");
        console.log("password is: ",hashedPassword)
        return hashedPassword
    }

    async authenticate(email, password){
        var hashedPassword = this.hashPassword(password, "")
        var user = await this.getUser(email);
        console.log("promiseObjectForUser: ",user)
        if (user == false){
            return false
        }
        console.log("user password is: ",user.password)
        if(user.password === hashedPassword){
            return true
        }
    }
    async search(){
        const usersPromiseObject = await User.findAll();
        // console.log("usersPromiseObject: ",usersPromiseObject)
            // console.log("users are: ",data)
        var users = [];
        for(var index=0; index < usersPromiseObject.length; index++){
            users.push(usersPromiseObject[index].dataValues)
        }
        console.log("users are: ",users)
        return users;
        
    }
    async create(firstName, lastName, email, password){
        if((typeof firstName != String) || (typeof lastName != String) || (typeof email != String) || (typeof password != String)){
            return false
        }
        var currentUserSalt = this.getSalt();
        var hashedPassword = this.hashPassword(password, currentUserSalt);
        
        try{
            const newUser = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                salt: currentUserSalt,
                session :"asd"
            });
            console.log("new user is: ",newUser.dataValues)
            return true
        }
        catch(error){
            console.log(error)
            if(error.errors[0].type == "unique violation"){
                return false
            }
        }
    }
    async getUserWithId(id){
        const user = await User.findAll({
            where:{
                id : id
            }
        })
        if (user == []){
            return false;
        }
        // console.log("found user: ",user[0].dataValues)
        return user[0].dataValues
    }
    async getUserWithEmail(email){
        const user = await User.findAll({
            where:{
                email : email
            }
        })
        if (user == []){
            return false;
        }
        // console.log("found user: ",user[0].dataValues)
        return user[0].dataValues
    }
}

const userController = new UserController();
// console.log("user created: ",userController.create("fahmida","mahjabin","eva@gmail.com","password"))
// console.log("user created: ",userController.create("rakib","ayon","rakib@gmail.com","password"))
// console.log("user created: ",userController.create("golam","muktadir","golam@gmail.com","password"))
// console.log("user created: ",userController.create("golam",3,"golam@gmail.com","password").then(message => console.log(message)))
console.log("authenticated: ",userController.authenticate("eva@gmail.com","password"))
// userController.getUser(3).then(user => console.log("User returned with id: ",user))
// userController.getUser("ayon@gmail.com").then(user => console.log("User returned with email: ",user))
// userController.authenticate("rakib@gmail.com","asd").then(user => console.log("user is: ",user))
// console.log(userController.create())