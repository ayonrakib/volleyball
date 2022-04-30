const User = require('./mariadb-models/User');
const db = require('./mariadb')

// db.query("SELECT * FROM user", (err, rows) => {
//     console.log("users are: ",rows);
// })

async function getUsers(){
    const users = await User.findAll();
    return users;
}

console.log(getUsers());