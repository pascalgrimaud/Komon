
/**
 * Created by Komo on 27/01/2015.
 */

angular.module('komon.services').factory('tagsService', ['$http', 'Restangular', function ($http, Restangular) {

    var tagsService = {};

    //Get tags by komoner id and query
    tagsService.getKomonerTags = function (komonerId, query) {
        return Restangular.all('tags').one('komoner', komonerId).one(query).get();
    };

    //Get tags by komoner id
    tagsService.getKomonerTags = function (komonerId) {
        return Restangular.all('tags').one('komoner', komonerId).get();
    };

    //Delete tag
    tagsService.deleteKomonerTag = function (tag) {
        return Restangular.one('tags', tag._id).remove();
    };

    tagsService.addKomonerTag = function(tag)
    {
        return Restangular.all('tags').post(tag);
    };

    return tagsService;
}]);
