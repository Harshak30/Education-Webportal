var express = require('express');
var router = express.Router();
var connection=require('../database');

router.get('/level', function(req, res, next) {
    var sql='SELECT * FROM tbl_level';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
   	 res.render('level', { levelData: data, name: req.session.username});
  });
});
module.exports = router;