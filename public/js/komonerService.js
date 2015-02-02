/**
 * Created by Komo on 02/02/2015.
 */

angular.module('komon.services').factory('komonerService', ['$http', 'Restangular', function($http, Restangular) {

    var komonerService = {};

    komonerService.getKomoner = function(id)
    {
        return Restangular.one('komoners', id).get();
    };

    return komonerService;
}]);
