var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kappa' });
});

router.get('/profile', function(req, res, next) {
    res.render('profile', controllers.profile.username);
});

module.exports = router;
