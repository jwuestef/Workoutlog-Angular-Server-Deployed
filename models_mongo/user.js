// purpose of this file is how we create users with the signup

var bcrypt = require('bcryptjs');    //making sure bcrypt is accessible inside this file. Encrypts data, we're going to use it to hash passwords



module.exports = function(mongoose){    //passes in mongoose, so we don't have to var mongoose = require(mongoose), when called from app.js

	var UserSchema = new mongoose.Schema({    //how we want to represent our data inside our database
		username: {type: String},
		password: {type: String}
	});


	var User = mongoose.model('User', UserSchema);   //the name of the model, and the outline we're going to use


	var registerCallback = function(err) {  //handles the result of the save command, whether there was an error or not
		if (err) {
			return console.log(err);
		};
		return console.log('Account was created');
	};



	var register = function(username, password) {
		var user = new User({          //with the given information, create a new user
			username: username,
			password: bcrypt.hashSync(password, 10)
		});
		user.save(registerCallback);          //and then save that user to the database. skip writing out the err function, instead make it named function
		console.log('Save command was sent');
	}


	return {    //this is what gets module.export'ed, available for use throughout the backend
		User: User,
		register: register
	}

}