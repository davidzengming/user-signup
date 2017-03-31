var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');
var controllers = require('../controllers');

router.post('/:resource', function(req, res, next) {
    var resource = req.params.resource;
    var controller = controllers[resource];
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Controller not found'
        });
        return;
    }
    var formData = req.body;
    controller
    .post(formData)
    .then(function(result) {
        res.json({
            confirmation: 'success',
            result : result
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err
        });
    });
});

router.get('/:resource', function(req, res, next) {
    var resource = req.params.resource;
    var controller = controllers[resource];
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Controller not found'
        });
        return;
    }
    controller
    .get(null)
    .then(function(results) {
        res.json({
            confirmation: 'success',
            result: results
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'failure',
            message: err
        });
    });
});

router.get('/:resource/:id', function(req, res, next) {
    var resource = req.params.resource;
    var id = req.params.id;
    var controller = controllers[resource];
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Controller not found'
        });
        return;
    }
    controller
    .getById(id)
    .then(function(result) {
        res.json({
            confirmation: 'success',
            result: result
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'failure',
            message: err.message
        });
    });
});

module.exports = router;