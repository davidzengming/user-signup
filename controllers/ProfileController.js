var Profile = require('../models/Profile');
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');

module.exports = {
    get: function(params, isRaw) {
        return new Promise(function(resolve, reject) {
            if (isRaw == null)
                isRaw = false;
            Profile.find(params, function(err, profiles) {
                if (err) {
                    reject(err);
                    return;
                }
                if (isRaw == true) {
                    resolve(profiles);
                    return;
                }
                var results = [];
                profiles.forEach(function(profile, i) {
                    results.push(profile.summary());
                });
                resolve(results);
            });
        });
    },

    getById: function(id) {
        return new Promise(function(resolve, reject) {
            Profile.findById(id, function(err, profile) {
                if (err) {
                    reject(new Error('Profile id not found!'));
                    return;
                }
                resolve(profile);
            });
        });
    },

    post: function(body) {
        return new Promise(function(resolve,reject) {
            if (body.password != null) {
                var password = body.password;
                var hashed = bcrypt.hashSync(password);
                body['password'] = hashed;
            }
            Profile.create(body, function(err, profile) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(profile);
            });
        });
    }
}