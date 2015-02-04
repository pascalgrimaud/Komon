/**
 * Created by Komo on 03/02/2015.
 */

angular.module('komon.directives').directive('komonTags', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'js/tags/komonTag.tpl.html',
        controller: ['$scope', '$element', '$attrs', 'tagsService', function ($scope, $element, $attrs, tagsService) {

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

            function isSelected(tag)
            {
                for(var i=0; i<scope.selectedTags.length; i++){
                    if(scope.selectedTags[i] === tag){
                        return true;
                    }
                }
                return false;
            }

            //Select tag
            scope.selectTag = function(tag)
                {
                    if(!isSelected(tag))
                    scope.selectedTags.push(tag);
                };


        }
    }
}]).directive('selectedTags', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'js/tags/komonSelectedTag.tpl.html',
        controller: ['$scope', '$element', '$attrs', 'tagsService', function ($scope, $element, $attrs, tagsService) {

        }],
        link: function (scope, elem, attrs) {
            //Style the tag element from tag data
            var tagElement = elem.children('.komonerTag');
            tagElement.css("background-color", scope.komonerTag.color);

            //Unselect tag
            scope.unselectTag = function(tag)
            {
                for(var i=0; i<scope.selectedTags.length; i++){
                    if(scope.selectedTags[i] === tag){
                        scope.selectedTags.splice(i, 1);
                    }
                }
            }

        }
    }
}]);