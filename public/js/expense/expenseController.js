/**
 * Created by Komo on 27/01/2015.
 */
angular.module('komon.controllers').controller('expenseController', ['$scope', '$http', 'expenseService',
    function ($scope, $http, expenseService) {

    $scope.komonerId = "54c7a0c902dbfa0c1f0afe5a";

    $scope.displayKomoner = function()
    {
        expenseService.getKomoner($scope.komonerId).then(function(result)
        {
            $scope.komoner = result;
        });

    };
}]);
