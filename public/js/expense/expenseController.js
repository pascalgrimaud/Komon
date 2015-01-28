/**
 * Created by Komo on 27/01/2015.
 */
angular.module('komon.controllers').controller('expenseController', ['$scope', '$http', 'expenseService', 'uiGridConstants',
    function ($scope, $http, expenseService, uiGridConstants) {

        $scope.gridOptions = {
            enableFiltering: true,
            columnDefs: [
                // default
                { field: 'name' },
                // pre-populated search field
                { field: 'tags'},
                // no filter input
                { field: 'comment', enableFiltering: false, filter: {
                    noTerm: true,
                    condition: function(searchTerm, cellValue) {
                        return cellValue.match(/a/);
                    }
                }},
                // specifies one of the built-in conditions
                // and a placeholder for the input
                {
                    field: 'price', filters: [
                    {
                        condition: uiGridConstants.filter.GREATER_THAN,
                        placeholder: 'greater than'
                    },
                    {
                        condition: uiGridConstants.filter.LESS_THAN,
                        placeholder: 'less than'
                    }
                ]
                },
                // custom condition function
                {
                    field: 'amount',  enableFiltering: false
                }
            ]
        };

        $scope.komonerId = "54c7a0c902dbfa0c1f0afe5a";

        $scope.displayKomoner = function () {
            expenseService.getKomoner($scope.komonerId).then(function (result) {
                $scope.komoner = result;
            });

        };

        $scope.getKomonerExpenses = function() {
            expenseService.getExpensesOfKomoner($scope.komonerId).then(function (result) {
                $scope.expenses = result;
                $scope.gridOptions.data = $scope.expenses;
            });
        };


        $scope.addKomonerExpense = function() {
            var expense = {
                komoner: $scope.komonerId,
                name: $scope.name,
                time: new Date(),
                comment: $scope.comment,
                //   tags: [Schema.Types.ObjectId],
                amount: $scope.amount,
                price: $scope.price
            };

            expenseService.addExpense(expense).then(function (result) {
                console.log("Expense added successfully.");
                //Refresh expenses
                $scope.getKomonerExpenses();
            });
        };

        $scope.getKomonerExpenses();
    }]);
