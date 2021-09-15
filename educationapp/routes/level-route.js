var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/insertlevel', function(req, res, next) {
    res.render('insertlevel-form',{ name: req.session.username});
});

router.post('/addlevel', function(req, res){
    const data = [req.body.inputname, req.body.mytextarea];
	var sql = "INSERT INTO tbl_level (level_title,level_description) VALUES (?,?)";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record inserted");
		 res.redirect('/viewlevel');
 	 });
});

router.get('/viewlevel', function(req, res, next) {
    var sql='SELECT * FROM tbl_level';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
   	 res.render('viewlevel-form', { levelData: data,name:req.session.username});
  });
});

router.get('/editlevel/:id', function(req, res, next) {
	var levelid=req.params.id;
    var sql='SELECT * FROM tbl_level where level_id=?';
    connection.query(sql,levelid, function (err, result, fields) {
        if (err) throw err;
		console.log(levelid);
        res.render('editlevel-form.ejs', {
            levelData: result[0],name:req.session.username
        });
  });
});

router.post('/leveldisplay', function(req, res) {
    const data = [req.body.inputname, req.body.mytextarea, req.body.id];
	var sql = "UPDATE tbl_level set level_title =? , level_description=? WHERE level_id=?";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record edited");
		 res.redirect('/viewlevel');
 	 });
});

router.get('/deletelevel/:id', function(req, res, next) {
	var id= req.params.id;
	var sql = 'DELETE FROM tbl_level WHERE level_id = ?';
	connection.query(sql, id, function (err, data) {
	  if (err) throw err;
	  console.log(" record(s) updated");
	});
	res.redirect('/viewlevel');
	
  });

module.exports = router;