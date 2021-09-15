var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/editcontact', function(req, res, next) {
    var sql='SELECT * FROM tbl_contact where con_id=1';
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('contactus-form.ejs', {
            contactData: result[0],name:req.session.username
        });
  });
});

router.post('/condisplay', function(req, res) {
    const data = [req.body.con_heading, req.body.con_address, req.body.con_phoneno,req.body.con_email];
	var sql = "UPDATE tbl_contact set con_heading =? , con_address =? , con_phoneno=?, con_email=? WHERE con_id=1";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record edited");
		 res.redirect('/editcontact');
 	 });
});

module.exports = router;