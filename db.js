const mysql = require('mysql');
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '789123',
  database: 'restful_db'
});
//conectar a la base de datos
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
module.exports = conn;
