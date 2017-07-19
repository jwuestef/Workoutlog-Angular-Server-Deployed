var Sequelize = require("sequelize");
var sequelize = new Sequelize("workoutlog", "postgres", "1postgresql1", {
	host: "localhost",
	dialect: "postgres"
});

sequelize.authenticate().then(
	function() {
		console.log("connected to workoutlog postgres DB");    // message that will be displayed when we successfully connect to the DB
	}, 
	function(err) {
		console.log(err);
	}
);


var User = sequelize.import("./models/user");


module.exports = sequelize;