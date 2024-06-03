var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    multipleStatements: true
});

db.connect(function(err){
    if(err){
        console.log(`lỗi kết nối ${err}`);
        db.end();
    }else{
        console.log(`đã kết nối được database`);
    }
});
module.exports = db;