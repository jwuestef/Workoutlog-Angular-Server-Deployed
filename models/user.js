
//build a user model in sequelize.... traditional for models to begin with a capital letter

module.exports = function(sequelize, DataTypes){

	return sequelize.define("user", {
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING,
	});


};
