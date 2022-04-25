const db = require('./mariadb');

db.query("INSERT INTO user (firstName, lastName, email, password, session) VALUES ('rakib' , 'ayon', 'rakib@gmail.com', 'password', '123');", (err, res) => {
    console.log("response from creating user: ", res.affectedRows)
})