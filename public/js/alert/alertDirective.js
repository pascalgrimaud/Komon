/**
 * Created by Komo on 30/01/2015.
 */

angular.module('komon.directives').directive('alertNotification', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'js/alert/alert.tpl.html',
        scope: false,
        link: function (scope, elem, attrs) {

             scope.closeAlert = function()
             {
                 scope.alert = {};
             }
        }
    };
}]);