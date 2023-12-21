const mysql2 = require("mysql2");
const con = mysql2.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Sql@2004',
    database: 'socialbook'
});
con.connect((err) => {
    if(err)throw err;
    console.log('connection has been created.');
});
module.exports.con = con;