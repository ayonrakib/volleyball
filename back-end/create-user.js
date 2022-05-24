const db = require('./mariadb');
const User = require('./mariadb-models/User')
const bcrypt = require('bcrypt');

// db.query("INSERT INTO users (firstName, lastName, email, password, session) VALUES ('rakib' , 'ayon', 'rakib@gmail.com', 'password', '123');", (err, res) => {
//     console.log("response from creating user: ", res.affectedRows)
// })

async function createUser(){
    const jane = await User.create({ firstName: "Jane", lastName: "Doe", email: "jane@gmail.com", password: "password", session: "123" });
    console.log("Jane's auto-generated ID:", jane.id);
}

createUser()