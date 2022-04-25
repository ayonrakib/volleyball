console.log("mariadb connection file ran!")
const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection(
                                        {
                                          host: '127.0.0.1', 
                                          user:'root', 
                                          password: 'password',
                                          connectionLimit: 5,
                                          database: "volleyball"
                                        }
                                    );

module.exports = conn;