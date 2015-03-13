/**
 * Created by Komo on 03/02/2015.
 */

angular.module('komon.directives').directive('komonTags', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'js/tags/komonTag.tpl.html',
        scope: {
            item: "=",
            selectedItems: "=",
            mode: "@",
            action: "@"
        },
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            //Checks if a tag is in the selectedItems array
            $scope.isSelected = function (tag) {
                return _.indexOf($scope.selectedItems, tag) >= 0;
            };

            //Select tag : add tag in selectedItems array
            $scope.selectTag = function (tag) {
                if (!$scope.isSelected(tag))
                    $scope.selectedItems.push(tag);
            };

            //Unselect tag : remove from selectedItems array
            $scope.unselectTag = function (tag) {
                _.pull($scope.selectedItems, tag);
            };

            $scope.toggleTagFilter = function (tag) {
                if (!$scope.isSelected(tag))
                    $scope.selectedItems.push(tag);
                else {
                    $scope.unselectTag(tag);
                }

                $scope.$emit('updateFilters');
            };

        }],

        link: function (scope, elem, attrs) {

            //Style the tag element from tag data
            var tagElement = elem.children('.komonerTag');
            tagElement.css("background-color", scope.item.color);

        }
    }
}]);
