console.log("mariadb connection file ran!")
// const mariadb = require('mariadb/callback');
// const conn = mariadb.createConnection(
//                                         {
//                                           host: '127.0.0.1', 
//                                           user:'root', 
//                                           password: 'password',
//                                           connectionLimit: 5,
//                                           database: "volleyball"
//                                         }
//                                     );

// module.exports = conn;
const Sequelize = require('sequelize');
// const sequelize = new Sequelize("mariadb::memory:");
const sequelize = new Sequelize(
  'volleyball' ,
  'root',
  'password',
  {
    host: "127.0.0.1",
    dialect: "mariadb"
  }
)
async function connect(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = sequelize;