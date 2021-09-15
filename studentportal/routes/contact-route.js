var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
var connection=require('../database');
//import alert from 'alert'
router.get('/contact', function(req, res, next) {
    var sql='SELECT * FROM tbl_contact where con_id=1';
    connection.query(sql,function (err, data, fields) {
    console.log(data)
    if (err) throw err;
   	 res.render('contact', { conData: data,msg: "", name: req.session.username});
  });
});

router.post('/mail', (req, res) => {

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: '',//email
      pass: ''//password
    }
  });

  // Specify what the email will look like
  const mailOpts = {
    from: '',//replace with your email
    to: '',//replace with your email 
    subject:  `Message from contact form on ${req.body.fname}`,
    html:`<h1>Contact details</h1>
     <h2> name:${req.body.fname}</h2><br> 
     <h2> email:${req.body.email} </h2><br> 
     <h2> phonenumber:${req.body.phone} </h2><br> 
     <h2> message:${req.body.comments} </h2><br>`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    var sql='SELECT * FROM tbl_contact where con_id=1';
    connection.query(sql,function (err, data, fields) {
    if (err) {
      res.render('contact', {msg:'message not sent',conData: data, name: req.session.username}); // Show a page indicating failure
    }
    else {
      res.render('contact', {msg: 'message sent successfully',conData: data, name: req.session.username}); // Show a page indicating success
    }
  });
});
});

module.exports = router;
