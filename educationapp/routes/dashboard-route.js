var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
    if (req.session.loggedin) {
        res.render('dashboard', {
            name: req.session.username,     
        });
    } else {
        req.send('Please login first!');
        res.redirect('/');
    }
});
module.exports = router;