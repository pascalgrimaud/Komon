var express = require('express');
var router = express.Router();
var moment = require('moment');

var Tag = require('../models/tag.js');

/* GET all tags */
router.get('/', function(req, res, next) {
    Tag.find(function (err, tags) {
        if (err) return next(err);
        res.json(tags);
    });
});

/* GET tags by komoner*/
router.get('/komoner/:id/:query?', function(req, res, next) {
    var komonerId = req.params.id;
    var query = req.params.query;
    var condition = {};
    if(query)
    {
        //i = case insensitive
        condition = { "komoner": komonerId, "name":  new RegExp(query, "i")};
    }
    else
    {
        condition = { "komoner": komonerId};
    }

    Tag.find(condition, function (err, tags) {
        if (err) return next(err);
        res.json(tags);
    });
});

/*
*//* GET expenses by user and by month*//*
router.get('/komoner/:id/year/:year/month/:month', function(req, res, next) {
    komonerId = req.params.id;
    month = req.params.month;
    year = req.params.year;
    var dateMin = new Date(year, month - 1, 1);
    var dateMax = new Date(year, month, 1);
    Expense.find({ "komoner": komonerId, "date": {$gte: dateMin, $lt: dateMax} }, function (err, expenses) {
        if (err) return next(err);
        res.json(expenses);
    });
});
*/

/* POST tags */
router.post('/', function(req, res, next) {
    var tag = new Tag(req.body);
    tag.save(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
/*
*//* GET /expenses/id *//*
router.get('/:id', function(req, res, next) {
    Expense.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

*//* PUT /expenses *//*
router.put('/', function(req, res, next) {
    Expense.update({"_id": req.body._id}, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

*//* DELETE /expenses/:id *//*
router.delete('/:id', function(req, res, next) {
    Expense.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

*//* DELETE /expenses/ *//*
router.delete('/', function(req, res, next) {
    Expense.remove(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});*/

module.exports = router;
