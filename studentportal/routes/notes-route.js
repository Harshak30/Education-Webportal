var express = require('express');
var router = express.Router();
var connection=require('../database');
var h2p = require('html2plaintext')
 
router.get('/studymaterial/:name', function(req, res, next) {
    var leveltitle=req.params.name;
    var sql='SELECT * FROM tbl_studymaterial where st_shortdesc=?';
    connection.query(sql,leveltitle,function (err, data, fields) {
    if (err) throw err;
    console.log(data[0].st_description);
    var note=h2p(data[0].st_description);
    console.log(note);
   	res.render('studymaterial', { studyData: data, name: req.session.username,notes:note});
  });
});

module.exports = router;