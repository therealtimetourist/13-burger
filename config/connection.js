// set instance of mySQL package
var mysql = require("mysql");
// ser db connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "burgers_db_user",
  password: "toorregrub",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


module.exports = connection;