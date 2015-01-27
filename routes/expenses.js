var express = require('express');
var router = express.Router();

var Expense = require('../models/expense.js');

/* GET expenses */
router.get('/', function(req, res, next) {
    Expense.find(function (err, expenses) {
        if (err) return next(err);
        res.json(expenses);
    });
});

/* GET expenses by user*/
router.get('/user/:id', function(req, res, next) {
    userId = req.params.id;
    Expense.find({ "komoner": userId }, function (err, expense) {
        if (err) return next(err);
        res.json(expense);
    });
});

/* POST expenses */
router.post('/', function(req, res, next) {
    var expense = new Expense(req.body);
    expense.save(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /expenses/id */
router.get('/:id', function(req, res, next) {
    Expense.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /expenses/:id */
router.put('/:id', function(req, res, next) {
    Expense.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /expenses/:id */
router.delete('/:id', function(req, res, next) {
    Expense.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /expenses/ */
router.delete('/', function(req, res, next) {
    Expense.remove(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
