/**
 * Created by Komo on 27/01/2015.
 */
angular.module('komon.controllers').controller('expenseController', ['$scope', '$http', '$filter', '$interval', '$timeout', 'expenseService', 'uiGridConstants', 'alertService', 'tagsService',
    function ($scope, $http, $filter, $interval, $timeout, expenseService, uiGridConstants, alertService, tagsService) {

        var lowEnd = 1;
        var highEnd = 99;
        $scope.amounts = [];
        while (lowEnd <= highEnd) {
            $scope.amounts.push({id: lowEnd, value: lowEnd});
            lowEnd++;
        }
        $scope.selectedTags = [];

      /*  $scope.komonerTags = [
            {name: "Courses", editable: true, image: "http://localhost:3000/images/tags/vegetables.png", color: "#00CC00", mode: "small"},
            {name: "Loisirs", editable: true, image: "http://localhost:3000/images/tags/football.png", color: "#FF9900"}
        ];*/

        $scope.gridOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            modifierKeysToMultiSelect: true,
            //  enableCellEditOnFocus: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            noUnselect: false,
            enableSelectAll: true,
            enableFiltering: true,
            columnDefs: [
                // default
                { field: 'name', filter: {placeholder: 'Filter by name'} },
                { field: '_tags',
                  cellTemplate : "<div class=\"ui-grid-cell-contents ng-scope ng-binding\">{{COL_FIELD CUSTOM_FILTERS}}<komoner-tags></komoner-tags></div>"
                },
                { field: 'date', filter: {
                    noTerm: true,
                    condition: function (searchTerm, cellValue) {
                        return cellValue.match(/a/);
                    }},
                    cellFilter: 'date:\'dd/MM/yyyy\'',
                    width: '100',
                    editableCellTemplate: '<input type="text" datepicker-popup="dd/MM/yyyy" datepicker-append-to-body=true ng-model="date" />'
                },
                // no filter input
                { field: 'comment', enableFiltering: false, filter: {
                    noTerm: true,
                    condition: function (searchTerm, cellValue) {
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
                    field: 'amount', width: '100', enableFiltering: false, editableCellTemplate: 'ui-grid/dropdownEditor',
                    editDropdownOptionsArray: $scope.amounts
                }
            ]
        };

        $scope.openDatepicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.openSwitch = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.switchOpened = true;
        };

        $scope.komonerId = "54c7a0c902dbfa0c1f0afe5a";

        $scope.getKomonerExpenses = function () {
            expenseService.getExpensesOfKomoner($scope.komonerId).then(function (result) {
                $scope.expenses = result;
                $scope.gridOptions.data = $scope.expenses;
            });
        };

        $scope.getKomonerTags = function () {
            tagsService.getKomonerTags($scope.komonerId).then(function (result) {
                $scope.komonerTags = result;
            });
        };

        function emptyForm() {
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

        //Default displayed value
        $scope.dateSwitch = moment().format('MMMM YYYY');

        $scope.switchMonth = function (date) {

            var newYear = moment(date).format('YYYY');
            var newMonth = moment(date).format('M');

            expenseService.getExpenseByMonth($scope.komonerId, newYear, newMonth).then(function (result) {
                $scope.expenses = result;
                $scope.gridOptions.data = $scope.expenses;
            });
        };

        $scope.prevMonth = function () {
            $scope.dateSwitch = moment($scope.dateSwitch).subtract(1, 'month');
            $scope.switchMonth($scope.dateSwitch);
            $scope.dateSwitch = moment($scope.dateSwitch).format('MMMM YYYY');
        };

        $scope.nextMonth = function () {
            $scope.dateSwitch = moment($scope.dateSwitch).add(1, 'month');
            $scope.switchMonth($scope.dateSwitch);
            $scope.dateSwitch = moment($scope.dateSwitch).format('MMMM YYYY');
        };


        $scope.addKomonerExpense = function () {

            //Get ids of selected tags

            var selectedTagsIds = [];

            for(var i=0; i<$scope.selectedTags.length; i++){
                selectedTagsIds.push($scope.selectedTags[i]._id);
            }


            var expense = {
                _komoner: $scope.komonerId,
                name: $scope.name,
                date: $filter('date')($scope.date, 'shortDate', 'fr_FR'),
                comment: $scope.comment,
                _tags: selectedTagsIds,
                amount: $scope.amount.value,
                price: $scope.price
            };

            expenseService.addExpense(expense).then(function (result) {
                //Refresh expenses
                $scope.switchMonth();
                $scope.alert = alertService.success("Added the expense : " + $scope.name + " !");
                emptyForm();
            });
        };

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, $scope.saveExpense);
        };

        function initialize()
        {
            //Default date
            $scope.switchMonth(new Date());
            $scope.getKomonerTags();
        }

        initialize();



        $scope.deleteKomonerExpenses = function () {
            angular.forEach($scope.gridApi.selection.getSelectedRows(), function (expense, index) {
                expenseService.deleteExpense(expense).then(function (result) {
                    //Refresh expenses
                    $scope.switchMonth();
                    $scope.alert = alertService.success("Removed the expense : " + expense.name + " !");
                });

            });

        };

        $scope.saveExpense = function (expense) {

            var promise = expenseService.saveExpense(expense);
            $scope.gridApi.rowEdit.setSavePromise(expense, promise);

            promise.then(function () {
                $scope.alert = alertService.success("Changes saved.");
                $timeout(function () {
                    $scope.alert = null;
                }, 5000);
            });

        };
    }]);
