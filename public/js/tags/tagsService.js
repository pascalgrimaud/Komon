
/**
 * Created by Komo on 27/01/2015.
 */

angular.module('komon.services').factory('tagsService', ['$http', 'Restangular', function ($http, Restangular) {

    var tagsService = {};

    //Get tags by komoner id
    tagsService.getKomonerTags = function (komonerId) {
        return Restangular.all('tags').one('komoner', komonerId).get();
    };

    return tagsService;
}]);
