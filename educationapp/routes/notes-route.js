var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/insertnotes', function(req, res, next) {
    var sql='SELECT DISTINCT level_title,course_title FROM tbl_course';
        connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('insertnotes-form.ejs', {
            dropdownVals: result,name:req.session.username
        });
  });
});

router.post('/addnotes', function(req, res){
    const data = [req.body.inputlevel, req.body.inputcourse, req.body.inputheading, req.body.mytextarea,req.body.mytextarea1];
	var sql = "INSERT INTO tbl_studymaterial (level_title,course_title,st_chname,st_shortdesc,st_description) VALUES (?,?,?,?,?)";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record inserted");
		 res.redirect('/viewnotes');
 	 });
});

router.get('/viewnotes', function(req, res, next) {
    var sql='SELECT * FROM tbl_studymaterial';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
   	 res.render('viewnotes-form', { notesData: data, name:req.session.username});
  });
});


router.get('/editnotes/:id', function(req, res, next) {
	var stid=req.params.id;
    var sql='SELECT * FROM tbl_studymaterial where st_id=?';
    connection.query(sql,stid, function (err, result, fields) {
        if (err) throw err;
		console.log(stid);
        res.render('editnotes-form.ejs', {
            notesData: result[0], name:req.session.username
        });
  });
});

router.post('/notesdisplay', function(req, res) {
    const data = [req.body.inputlevel, req.body.inputcourse, req.body.inputheading, req.body.mytextarea,req.body.mytextarea1,req.body.id];
	var sql = "UPDATE tbl_studymaterial set level_title=?,course_title=?,st_chname=?,st_shortdesc=?,st_description=? WHERE st_id=?";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record edited");
		 res.redirect('/viewnotes');
 	 });
});
router.get('/deletenotes/:id', function(req, res, next) {
	var id= req.params.id;
	  var sql = 'DELETE FROM tbl_studymaterial WHERE st_id = ?';
	  connection.query(sql, id, function (err, data) {
	  if (err) throw err;
	  console.log(" record(s) updated");
	});
	res.redirect('/viewnotes');
	
  });
module.exports = router;