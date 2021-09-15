var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/editabout', function(req, res, next) {
    var sql='SELECT * FROM tbl_about where about_id=1';
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('aboutus-form.ejs', {
            aboutData: result[0],name:req.session.username
        });
  });
});

router.post('/abdisplay', function(req, res) {
    const data = [req.body.inputheading, req.body.shtdesc, req.body.desc];
	var sql = "UPDATE tbl_about set ab_heading =? , ab_shortdesc =? , ab_description=? WHERE about_id=1";
	connection.query(sql,data,function (err, result) {
  	  if (err) throw err;
   		 console.log("1 record edited");
		 res.redirect('/editabout');
 	 });
});

module.exports = router;