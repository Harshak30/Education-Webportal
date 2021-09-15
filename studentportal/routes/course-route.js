var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/course/:name', function(req, res, next) {
    var leveltitle=req.params.name;
    console.log(leveltitle)
    var sql='SELECT * FROM tbl_course where level_title=?';
    connection.query(sql,leveltitle,function (err, data, fields) {
    console.log(data)
    if (err) throw err;
   	 res.render('course', { courseData: data, name: req.session.username});
  });
});

module.exports = router;