var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/insertuser', function(req, res, next) {
    res.render('insertuser-form',{ name: req.session.username});
});

router.post('/adduser', function(req, res){
    const data = [req.body.inputname, req.body.inputemail, req.body.inputpassword,req.body.inputcontact,req.body.inputdesignation];
	var sql = "INSERT INTO tbl_admin (admin_name,admin_email, admin_password,admin_contact,admin_designation) VALUES (?,?,?,?,?)";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record inserted");
		 res.redirect('/viewuser');
 	 });
});

router.get('/viewuser', function(req, res, next) {
    var sql='SELECT * FROM tbl_admin';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
   	 res.render('viewuser-form', { userData: data,name:req.session.username});
  });
});

router.get('/edituser/:id', function(req, res, next) {
	var userid=req.params.id;
    var sql='SELECT * FROM tbl_admin where admin_id=?';
    connection.query(sql,userid, function (err, result, fields) {
        if (err) throw err;
		console.log(userid);
        res.render('edituser-form.ejs', {
            userData: result[0],name:req.session.username
        });
  });
});

router.post('/userdisplay', function(req, res) {
    const data = [req.body.inputname, req.body.inputemail, req.body.inputpassword,req.body.inputcontact,req.body.inputdesignation,req.body.id];
	var sql = "UPDATE tbl_admin set admin_name=?,admin_email=?, admin_password=?,admin_contact=?,admin_designation=? WHERE admin_id=?";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record edited");
		 res.redirect('/viewuser');
 	 });
});

router.get('/deleteuser/:id', function(req, res, next) {
	var id= req.params.id;
	  var sql = 'DELETE FROM tbl_admin WHERE admin_id = ?';
	  connection.query(sql, id, function (err, data) {
	  if (err) throw err;
	  console.log(" record(s) updated");
	});
	res.redirect('/viewuser');
	
  });
module.exports = router;