var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.get('/logout', function(req, res, next) {
    req.session.reset();
    res.json({
        confirmaiton: 'success',
        user: null
    })
    return;
})

router.get('/currentuser', function(req, res, next) {
    if (req.session.token == null) {
        res.json({
            confirmation: 'success',
            user: null
        });
    }

    jwt.verify(req.session.token, '123', function(err, decode) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: 'invalid token'
            });
            return;
        }
        res.json({
                confirmation: 'success'
        });
    })
});

router.post('/register', function(req, res, next) {
    var formData = req.body;
    controllers.profile
    .post(formData)
    .then(function(profile) {
        req.session.token = jwt.sign({id: profile._id.toString()}, '123', {expiresIn:4000});
        res.redirect('/profile');
        return;
    })
    .catch(function(err) {
        next(err);
    });
});

router.post('/login', function(req, res, next) {
    var formData = req.body;

    controllers.profile
    .get({email: formData.email}, true)
    .then(function(profiles) {
        if (profiles.length == 0) {
            res.json({
                confirmation: 'failure',
                message: 'profile not found'
            });
            return;
        }
        var profile = profiles[0];
        var passwordCorrect = bcrypt.compareSync(formData.password, profile.password);
        if (passwordCorrect = false) {
            res.session.reset();
            res.json({
                confirmation: 'failure',
                message: 'incorrect password'
            });
            return;
        }
        //req.session.user = profile._id.toString(); // attach session
        req.session.token = jwt.sign({id: profile._id.toString()}, '123', {expiresIn:4000});
        res.redirect('/profile');
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err
        });
    });
});

module.exports = router;