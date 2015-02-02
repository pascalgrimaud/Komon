/**
 * Created by Komo on 27/01/2015.
 */
angular.module('komon.controllers').controller('expenseController', ['$scope', '$http', '$filter', '$interval', '$q', 'expenseService', 'uiGridConstants', 'alertService',
    function ($scope, $http, $filter, $interval, $q, expenseService, uiGridConstants, alertService) {

        $scope.gridOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            modifierKeysToMultiSelect: true,
            noUnselect : false,
            enableSelectAll: true,
            enableFiltering: true,
            columnDefs: [
                // default
                { field: 'name' },
                { field: 'tags'},
                { field: 'date', filter: {
                    noTerm: true,
                    condition: function(searchTerm, cellValue) {
                        return cellValue.match(/a/);
                    }},
                    cellFilter: 'date:\'dd/MM/yyyy\'',
                    width: '100'
                },
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
                    field: 'price',
                    width: '130',
                    filters: [
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
                    field: 'amount', width: '100',  enableFiltering: false
                }
            ]
        };

        $scope.openDatepicker = function($event)
        {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.openSwitch = function($event)
        {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.switchOpened = true;
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

        function emptyForm()
        {
            $scope.name = null;
            $scope.tags = null;
            $scope.date = null;
            $scope.comment = null;
            $scope.price = null;
            $scope.amount = null;
        }

        $scope.dateSwitchOptions =
        {
            minMode: "month"
        };

       $scope.dateSwitch = $filter('date')(new Date(), 'MMMM yyyy');

        $scope.switchMonth = function() {

            var newYear = $filter('date')($scope.dateSwitch, 'yyyy');
            var newMonth = $filter('date')($scope.dateSwitch, 'M');

            expenseService.getExpenseByMonth($scope.komonerId, newYear, newMonth).then(function (result) {
                $scope.expenses = result;
                $scope.gridOptions.data = $scope.expenses;
            });
        };


        $scope.addKomonerExpense = function() {
            var expense = {
                komoner: $scope.komonerId,
                name: $scope.name,
                date: $filter('date')($scope.date, 'shortDate', 'fr_FR'),
                comment: $scope.comment,
                //   tags: [Schema.Types.ObjectId],
                amount: $scope.amount,
                price: $scope.price
            };

            expenseService.addExpense(expense).then(function (result) {
                //Refresh expenses
                $scope.getKomonerExpenses();
                $scope.alert = alertService.success("Added the expense : " + $scope.name + " !");
                emptyForm();
            });
        };

        $scope.gridOptions.onRegisterApi = function( gridApi ) {
            $scope.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, $scope.saveExpense);
        };

        $scope.getKomonerExpenses();

        $scope.deleteKomonerExpenses = function() {
            angular.forEach($scope.gridApi.selection.getSelectedRows(), function(expense, index){
                expenseService.deleteExpense(expense).then(function (result) {
                    //Refresh expenses
                    $scope.getKomonerExpenses();
                    $scope.alert = alertService.success("Removed the expense : " + expense.name + " !");
                });

            });

        };

        $scope.saveExpense = function(expense) {
        /*    var promise = expenseService.saveExpense(expense);
            $scope.gridApi.rowEdit.setSavePromise(expense, promise.promise);
            console.log(promise);*/

            var promise = expenseService.saveExpense(expense);
            $scope.gridApi.rowEdit.setSavePromise(expense, promise);

            // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
            $interval( function() {
                promise.resolve();

            }, 3000, 1);
        };
    }]);
