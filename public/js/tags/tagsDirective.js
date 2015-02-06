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
             action:"@"
        },
        controller: ['$scope', '$element', '$attrs', 'tagsService', function ($scope, $element, $attrs, tagsService) {

            //Small tags mode if attribute = small
            if($scope.mode == 'small')
            {
                $scope.item.mode = "small";
            }

            //Checks if a tag is in the selectedItems array
            function isSelected(tag)
            {
                for(var i=0; i<$scope.selectedItems.length; i++){
                    if($scope.selectedItems[i] === tag){
                        return true;
                    }
                }
                return false;
            }

            //Select tag : add tag in selectedItems array
            $scope.selectTag = function(tag)
            {
                if(!isSelected(tag))
                    $scope.selectedItems.push(tag);
            };

            //Unselect tag : remove from selectedItems array
            $scope.unselectTag = function(tag)
            {
                for(var i=0; i<$scope.selectedItems.length; i++){
                    if($scope.selectedItems[i] === tag){
                        $scope.selectedItems.splice(i, 1);
                    }
                }
            }

        }],

        link: function (scope, elem, attrs) {

            //Style the tag element from tag data
            var tagElement = elem.children('.komonerTag');
            tagElement.css("background-color", scope.item.color);

        }
    }
}]);
