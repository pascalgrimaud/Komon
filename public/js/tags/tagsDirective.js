/**
 * Created by Komo on 03/02/2015.
 */

angular.module('komon.directives').directive('komonTags', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'js/tags/tags.tpl.html',
        controller: ['$scope', '$element', '$attrs', 'tagsService', function ($scope, $element, $attrs, tagsService) {

            console.log("ee");

            $scope.komonerTags = [
                { text: 'just' },
                { text: 'some' },
                { text: 'cool' },
                { text: 'tags' }
            ];

            $scope.loadKomonerTags = function (query) {
                var promise = tagsService.getKomonerTags($scope.komonerId, query);
                promise.then(function(result)
                {
                    console.log(result);
                });
                return promise;
            };
        }],
        link: function (scope, elem, attrs) {

        }
    };
}]);