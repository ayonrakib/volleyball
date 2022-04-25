const db = require('./mariadb')

db.query("SELECT * FROM user", (err, rows) => {
    console.log("users are: ",rows);
})