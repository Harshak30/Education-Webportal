var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/about', function(req, res, next) {
    var sql='SELECT * FROM tbl_about where about_id=1';
    connection.query(sql,function (err, data, fields) {
    console.log(data)
    if (err) throw err;
   	 res.render('about', { abData: data, name: req.session.username});
  });
});

module.exports = router;
