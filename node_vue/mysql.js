const mysql = require('mysql');

module.exports = mysql.createPool({
    // host: '188.131.145.204',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'hs',
    

    // 部署
    // host     : process.env.MYSQL_HOST,
    // port     : process.env.MYSQL_PORT,
    // user     : process.env.ACCESSKEY,
    // password : process.env.SECRETKEY,
    // database : 'app_' + process.env.APPNAME,


    connectTimeout: 15

})


