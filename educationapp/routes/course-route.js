var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/insertcourse', function(req, res, next) {
    var sql='SELECT * FROM tbl_level';
        connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('insertcourse-form.ejs', {
            dropdownVals: result,
            name: req.session.username
        });
  });
});

router.post('/addcourse', function(req, res){
    const data = [req.body.inputlevel, req.body.inputname,req.body.mytextarea];
	var sql = "INSERT INTO tbl_course (level_title,course_title,course_description) VALUES (?,?,?)";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record inserted");
		 res.redirect('/viewcourse');
 	 });
});

router.get('/viewcourse', function(req, res, next) {
    var sql='SELECT * FROM tbl_course';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
   	 res.render('viewcourse-form', { courseData: data,name:req.session.username});
  });
});

router.get('/editcourse/:id', function(req, res, next) {
	var courseid=req.params.id;
    var sql='SELECT * FROM tbl_course where course_id=?';
    connection.query(sql,courseid, function (err, result, fields) {
        if (err) throw err;
		console.log(courseid);
        res.render('editcourse-form.ejs', {
            courseData: result[0],name:req.session.username
        });
  });
});

router.post('/coursedisplay', function(req, res) {
    const data = [req.body.inputlevel,req.body.inputname, req.body.mytextarea, req.body.id];
	var sql = "UPDATE tbl_course set level_title =?,course_title=? ,course_description=? WHERE course_id=?";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record edited");
		 res.redirect('/viewcourse');
 	 });
});

router.get('/deletecourse/:id', function(req, res, next) {
	var id= req.params.id;
	var sql = 'DELETE FROM tbl_course WHERE course_id = ?';
	connection.query(sql, id, function (err, data) {
	  if (err) throw err;
	  console.log(" record(s) updated");
	});
	res.redirect('/viewcourse');
	
  });
module.exports = router;