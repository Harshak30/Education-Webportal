var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/viewstudent', function(req, res, next) {
    var sql='SELECT * FROM tbl_student';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
   	 res.render('viewstudent-form', { studData: data,name:req.session.username});
  });
});
module.exports = router;