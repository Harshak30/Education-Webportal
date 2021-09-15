var express = require('express');
var router = express.Router();
var connection=require('../database');

router.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM tbl_admin WHERE admin_name = ? AND admin_password = ?; ', [username, password,username], function(error, results, fields) {
			console.log(results[1]);
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/dashboard');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//display home page
router.get('/dashboard', function(request, res, next) {
    if (request.session.loggedin) {
        res.render('dashboard', {
            name: request.session.username     
        });
    } else {
 
        request.send('success', 'Please login first!');
        res.redirect('/');
    }
});
 
// Logout user
router.get('/logout', function (request, res) {
  request.session.destroy();
  res.redirect('/');
});


module.exports = router;