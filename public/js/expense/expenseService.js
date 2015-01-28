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
        return Restangular.all('expenses').one('user', komonerId).get();
    };

    expenseService.addExpense = function(expense)
    {
        return Restangular.all('expenses').post(expense);
    };

    return expenseService;
}]);
