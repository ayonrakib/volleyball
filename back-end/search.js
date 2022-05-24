const User = require('./mariadb-models/User');
const db = require('./mariadb')

// db.query("SELECT * FROM user", (err, rows) => {
//     console.log("users are: ",rows);
// })

async function getUsers(){
    const userObjects = await User.findAll();
    var users = [];
    for(var index = 0; index < userObjects.length; index++){
        users.push(userObjects[index].dataValues)
    }
    console.log("users are: ",users)
    // return users;
}

getUsers();