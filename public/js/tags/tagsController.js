/**
 * Created by Komo on 03/02/2015.
 */

angular.module('komon.controllers').controller('tagsController', ['$scope', '$http', '$filter', '$interval', '$timeout', 'tagsService',
    function ($scope, $http, $filter, $interval, $timeout, tagsService) {

        $scope.loadKomonerTags = function (query) {
            tagsService.getKomonerTags($scope.komonerId).then(function()
            {

            });
        };

    }]);
