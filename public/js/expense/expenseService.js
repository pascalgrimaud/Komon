/**
 * Created by Komo on 27/01/2015.
 */

angular.module('komon.services').factory('expenseService', ['$http', 'Restangular', function($http, Restangular) {

    var expenseService = {};

    expenseService.getKomoner = function(id)
    {
        return Restangular.one('komoners', id).get();
    };

    expenseService.getExpensesOfKomoner = function(komonerId)
    {
        return Restangular.all('expenses').one('komoner', komonerId).get();
    };

    expenseService.getExpenseByMonth = function(komonerId, year, month)
    {
        return Restangular.all('expenses').one('komoner', komonerId).one('year', year).one('month', month).get();
    };

    expenseService.addExpense = function(expense)
    {
        return Restangular.all('expenses').post(expense);
    };

    expenseService.deleteExpense = function(expense)
    {
        return Restangular.one('expenses', expense._id).remove();
    };

    expenseService.saveExpense = function(expense)
    {
       return Restangular.one('expenses', expense._id).get().then(function(object) {
            object.date = expense.date;
            object.name = expense.name;
            object.tags = expense.date;
            object.comment = expense.comment;
            object.price = expense.price;
            object.amount = expense.amount;
            object.put();
        });

    };

    return expenseService;
}]);
