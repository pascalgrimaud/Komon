/**
 * Created by Komo on 03/02/2015.
 */

angular.module('komon.directives').directive('komonTags', ['$timeout', function ($timeout) {
   /* return {
        restrict: 'EA',
        templateUrl: 'js/tags/tags.tpl.html',
        controller: ['$scope', '$element', '$attrs', 'tagsService', function ($scope, $element, $attrs, tagsService) {

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
    };*/
    return {
        restrict: 'EA',
        templateUrl: 'js/tags/komonTag.tpl.html',
        controller: ['$scope', '$element', '$attrs', 'tagsService', function ($scope, $element, $attrs, tagsService) {



         /*   $scope.komonerTags = [
                { text: 'just' },
                { text: 'some' },
                { text: 'cool' },
                { text: 'tags' }
            ];*/

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
            //Style the tag element from tag data
            var tagElement = elem.children('.komonerTag');
            tagElement.css("background-color", scope.komonerTag.color);

        }
    }
}]);