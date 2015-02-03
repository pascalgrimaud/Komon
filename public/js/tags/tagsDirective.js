/**
 * Created by Komo on 03/02/2015.
 */

angular.module('komon.directives').directive('komon-tags', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'js/tags/tags.tpl.html',
        controller: 'js/tags/tagsController.js',
        link: function (scope, elem, attrs) {


        }
    };
}]);