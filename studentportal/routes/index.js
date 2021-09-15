var express = require('express');
var router = express.Router();
var connection=require('../database');

/* GET home page. 
router.get('/a', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.post('/register', function(req, res){
    const data = [req.body.sname,req.body.semail,req.body.spassword,req.body.dob,req.body.standard,req.body.school,req.body.city];
	var sql = "INSERT INTO tbl_student (stu_name,stu_email,stu_password,stu_dob,stu_class,stu_school,stu_city) VALUES (?,?,?,?,?,?,?)";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log(data);
		 res.redirect('/level');
 	 });
});


router.post('/login', function(request, response) {
	var username = request.body.email1;
	var password = request.body.password1;
	if (username && password) {
		connection.query('SELECT * FROM tbl_student WHERE stu_name = ? AND stu_password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/level1');
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

router.get('/', function(req, res, next) {
    var sql='SELECT * FROM tbl_contact where con_id=1; SELECT * FROM tbl_about where about_id=1;';
    connection.query(sql,function (err, data, fields) {
    if (err) throw err;
   	 res.render('index', { conData: data[0],abData:data[1]});
		console.log(data[0],data[1]);
  });
});


router.get('/level1', function(request, res, next) {
	var sql='SELECT * FROM tbl_level';
    connection.query(sql, function (err, data, fields) {
    if (request.session.loggedin) {
        res.render('level', {
            name: request.session.username,
			levelData: data
        });
    } else {
 
        request.send('success', 'Please login first!');
        res.redirect('/');
    }
	});
});

module.exports = router;
