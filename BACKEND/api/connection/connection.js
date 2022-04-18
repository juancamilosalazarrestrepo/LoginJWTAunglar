const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Camilo1992.',
    database : 'db_shop',

});

mysqlConnection.connect(err => {
    if(err){
        console.log('error en db:',err);
        return;
    }else{
        console.log('DB conectada');
    }
});

module.exports = mysqlConnection;
