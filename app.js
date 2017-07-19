require("dotenv").config();     // Only thing inside .env file is:   JWT_SECRET=i_am_secret

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sequelize = require("./db.js");
var User = sequelize.import("./models/user");



//mongo setup
// var mongoose = require("mongoose");
// var mongodb = require("./db_mongo");
// var Account = require("./models_mongo/user")(mongoose);   //passes in mongoose so we can use it inside of this file, without having to require() it there

// mongoose.connect(mongodb.databaseUrl);    //actually connect to the database. We get the exported variable databaseUrl from the db_mongo.js file
// mongoose.connection.on("connected", function() {   //fires when the connection succeeds, and lets us know that
// 	console.log("connected to db " + mongodb.databaseUrl);
// });
//end mongo setup




// changed the following from User.sync to sequelize.sync at the end of module 18, per screen shots, to fix internal server error
sequelize.sync();   //call the sequelize method on the User object... this line of code creates a table in postgres and matches the model we defined. (doesn't drop the DB)
// User.sync({force:true})  //this will drop the table completely, should we ever need to do so. Must comment out User.sync() at the same time

app.use(bodyParser.json());  //tell the application to use bodyParser. Will take data off incoming requests and turn it into JSON. It will take that JSON and expose it to be used for req.body

app.use(require("./middleware/headers"));  //will pull the headers module, which we've made to allow cross origin requests to this server.
app.use(require("./middleware/validate-session"));

//creating a user
app.use("/api/user", require("./routes/user"));   // OLD
// app.post("/api/user", function(req, res) {
// 	var username = req.body.user.username;
// 	var pass = req.body.user.password;
// 	Account.register(username, pass);   //passes the username and password into the register function, which we created in the user.js file, exported as Account
// 	res.send(200);
// });


//login route
app.use("/api/login", require("./routes/session"));
app.use("/api/definition", require("./routes/definition"));
app.use("/api/log", require("./routes/log"));





app.use("/api/test", function(req, res) {
	res.send("Hello World!");
});






app.listen(3000, function() {
	console.log("app is listening on 3000");
});








