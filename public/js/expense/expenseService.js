/**
 * Created by Komo on 27/01/2015.
 */

angular.module('komon.services').factory('expenseService', ['$http', 'Restangular', function($http, Restangular) {

    var expenseService = {};

    expenseService.getKomoner = function(id)
    {
        return Restangular.one('komoners', id).get();
    };

    return expenseService;
}]);
