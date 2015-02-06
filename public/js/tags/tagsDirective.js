/**
 * Created by Komo on 03/02/2015.
 */

angular.module('komon.directives').directive('komonTags', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'js/tags/komonTag.tpl.html',
        scope: {
             item:"=",
             selectedItems:"=",
             mode:"@mode",
             pop:"="
        },
        controller: ['$scope', '$element', '$attrs', 'tagsService', function ($scope, $element, $attrs, tagsService) {

            //Small tags mode if attribute = small
            if($scope.mode == 'small')
            {
                $scope.item.mode = "small";
            }

            function isSelected(tag)
            {
                for(var i=0; i<$scope.selectedItems.length; i++){
                    if($scope.selectedItems[i] === tag){
                        return true;
                    }
                }
                return false;
            }

            //Select tag
            $scope.selectTag = function(tag)
            {
                if(!isSelected(tag))
                    $scope.selectedItems.push(tag);
            };


        }],

        link: function (scope, elem, attrs) {

            //Style the tag element from tag data
            var tagElement = elem.children('.komonerTag');
            tagElement.css("background-color", scope.item.color);

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
}]).directive('tagsFilter', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'js/tags/tagsFilter.tpl.html',
        controller: ['$scope', '$element', '$attrs', 'tagsService', function ($scope, $element, $attrs, tagsService) {

        }],
        link: function (scope, elem, attrs) {
            //Style the tag element from tag data
            var tagElement = elem.children('.komonerTag');
            tagElement.css("background-color", scope.komonerTag.color);

            //Select or unselect tag
            scope.selectTag = function(tag)
            {
                for(var i=0; i<scope.selectedTags.length; i++){
                    if(scope.selectedTags[i] === tag){
                        scope.selectedTags.splice(i, 1);
                    }
                }
            }

        }
    }
}]);;
