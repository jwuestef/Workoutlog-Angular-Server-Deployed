var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');


router.post('/', function(req, res) {
	User.findOne( { where: { username: req.body.user.username } } ).then(
		function(user) {
			if (user) {
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
					if (matches) {
					   var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
						res.json({
							user: user,
							message: "successfully authenticated",
							sessionToken: token
						});
					} else {
					res.status(500).send({ error: "failed to authenticate" });
					}
				});
			} else {
				res.status(500).send({ error: "failed to authenticate" });
			}
		},
		function(err) {
			res.json(err);
		}
	);
});

module.exports = router;



// In this huge callback function for our post route there are many things occurring.  
// First, if there is a user we will either authenticate that login by comparing passwords or we will return an err saying that the password failed to authenticate.  
// If there isn’t a user then we say, hey we failed to authenticate.  
// The function(err) at the end is basically saying we couldn’t connect to the DB.  So why the three “failed to authenticate” ?  
// Because if we provide more specific details, we potentially open the app up to bad attempts.  
// If the app responds, “bad password” then a hack automatically knows the username exists.  
// This allows the hack to eliminate half of the information needed to penetrate the app.  
// If we say, hey that user doesn’t exist, then the hacker moves on.  
// Hacking is about time and reducing the probability of an account of a password existing.  
// Therefore, keeping the information vague, helps decrease the exposure to nefarious attacks.