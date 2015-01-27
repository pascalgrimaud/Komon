var express = require('express');
var router = express.Router();

var Komoner = require('../models/expense.js');

/* GET komoners */
router.get('/', function(req, res, next) {
    Komoner.find(function (err, komoners) {
        if (err) return next(err);
        res.json(komoners);
    });
});

/* POST komoners */
router.post('/', function(req, res, next) {
    var komoner = new Komoner(req.body);
    komoner.save(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /komoners/id */
router.get('/:id', function(req, res, next) {
    Komoner.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /komoners/:id */
router.put('/:id', function(req, res, next) {
    Komoner.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /komoners/:id */
router.delete('/:id', function(req, res, next) {
    Komoner.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /komoners/ */
router.delete('/', function(req, res, next) {
    Komoner.remove(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
