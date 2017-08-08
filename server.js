// server.js file
// required node packages
var express = require('express');
var bodyParser = require('body-parser');
// workaround to allow HTML5 to use Put/Delete
var methodOverride = require("method-override");

// set instance of express
var app  = express();

// set port
var port = process.env.port || 3002;

// serve static content from app's public directory
app.use(express.static("public"));

// use method override
app.use(methodOverride("_method"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// set instance of express-handlebars
var exphbs = require("express-handlebars");

// set default layout/view for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// set db connection instance
var connection = require('config/connection.js');
// set instance of orm and db connection
var orm = require('config/orm.js');

// get info on all burgers from db
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers WHERE devoured = 0", function(err, data) {
    if (err) {
      throw err;
    }
    res.render("index", { burgers: data });
  });
});

// post a new burger to db
app.post("/", function(req, res) {
  connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

app.put("/", function(req, res) {
  connection.query("UPDATE burgers SET devoured = 1 WHERE id = ?", [req.body.burger, req.body.id], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});


// set port to listen for connections
app.listen(port);
