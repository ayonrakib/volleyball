const sequelize = require('../mariadb');
const User = require("../mariadb-models/User")
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('mariadb::memory:');
// const mariadb = require('../mariadb');
// const User = require('../models/User')
// const sequelize = new Sequelize(
//     'volleyball' ,
//     'root',
//     'password',
//     {
//       host: "127.0.0.1",
//       dialect: "mariadb"
//     }
//   )

// async function connect(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// connect()
// const User = sequelize.define('user', {
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     session: DataTypes.STRING,
//     role: DataTypes.STRING
//   },
//   {
//     timestamps: false,
//     createdAt: false,
//     updatedAt: false,
//   });

  
// (async () => {
// await sequelize.sync();
// // Code here
// })();

class UserController{
    constructor(){

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
    async create(){
        try{
            const newUser = await User.create({
                firstName: "fahmida",
                lastName: "mahjabin",
                email: "asd@gmail.com",
                password: "password",
                session :"asd"
            });
            console.log("new user is: ",newUser)
            return true
        }
        catch(error){
            console.log(error.errors[0].type)
            if(error.errors[0].type == "unique violation"){
                return false
            }
        }
    }
    // async getUserWithId(id){
    //     const user = await User.findAll({
    //         where:{
    //             id : id
    //         }
    //     })
    //     if (user == []){
    //         return false;
    //     }
    //     // console.log("found user: ",user[0].dataValues)
    //     return user[0].dataValues
    // }
    // async getUserWithEmail(email){
    //     const user = await User.findAll({
    //         where:{
    //             email : email
    //         }
    //     })
    //     if (user == []){
    //         return false;
    //     }
    //     // console.log("found user: ",user[0].dataValues)
    //     return user[0].dataValues
    // }
    async getUser(attribute){
        // console.log(typeof 3)
        // console.log(typeof "3")
        if(typeof attribute === "number"){
            const user = await User.findAll({
                where:{
                    id : attribute
                }
            })
            if (user == []){
                return false;
            }
            // console.log("found user: ",user[0].dataValues)
            return user[0].dataValues
        }
        else{
            const user = await User.findAll({
                where:{
                    email : attribute
                }
            })
            if (user == []){
                return false;
            }
            // console.log("found user: ",user[0].dataValues)
            return user[0].dataValues
        }

    }
}

const userController = new UserController();
// console.log("users are: ",userController.search())
userController.getUser(3).then(user => console.log("User returned with id: ",user))
userController.getUser("ayon@gmail.com").then(user => console.log("User returned with email: ",user))
// console.log(userController.create())

// async function search(){
//     const users = await User.findAll();
//     return users;
// }
// const usersPromiseObject = search();
// usersPromiseObject.then(data =>{
//     var users = [];
//     for(var index=0; index < data.length; index++){
//         users.push(data[index].dataValues)
//     }
//     console.log("users are: ",users)
// })
