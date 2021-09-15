var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/chapter/:name', function(req, res, next) {
    var leveltitle=req.params.name;
    var sql='SELECT * FROM tbl_studymaterial where course_title=?';
    connection.query(sql,leveltitle,function (err, data, fields) {
    if (err) throw err;
   	 res.render('chapter', { chapData: data, name: req.session.username});
  });
});

module.exports = router;