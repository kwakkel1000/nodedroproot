/*global
    process
*/
/*jslint
    node: true
*/
'use strict';

var Promise     = require('promise');

var dropRootGroup = function(group){
    var promise = new Promise(function (resolve, reject) {
        if (process.getgid && process.setgid) {
            try {
                process.setgid(group);
                resolve(1);
            }catch (err){
                console.log('Failed to set gid: ' + err);
                reject(err);
            }
        }
    });
    return promise;
};

var dropRootUser = function(user){
    var promise = new Promise(function (resolve, reject) {
        if (process.getuid && process.setuid) {
            try {
                process.setuid(user);
                resolve(1);
            }catch (err){
                console.log('Failed to set uid: ' + err);
                reject(err);
            }
        }
    });
    return promise;
};

var drop = function(group, user){
    var promise = new Promise(function (resolve, reject) {
        dropRootGroup(group)
        .then(function(result){
            return dropRootUser(user);
        }).then(function(result){
            resolve(result);
        }, function(reason){
            reject(reason);
        });
    });
    return promise;
};

module.exports = {
    drop:drop
};
