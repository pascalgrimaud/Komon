/**
 * Created by Komo on 27/01/2015.
 */
angular.module('komon.controllers').controller('expenseController', ['$scope', '$http', '$filter', '$interval', '$timeout', 'expenseService', 'uiGridConstants', 'alertService', 'tagsService'
    , 'modalService',
    function ($scope, $http, $filter, $interval, $timeout, expenseService, uiGridConstants, alertService, tagsService, modalService) {

        var lowEnd = 1;
        var highEnd = 99;
        $scope.amounts = [];
        while (lowEnd <= highEnd) {
            $scope.amounts.push({id: lowEnd, value: lowEnd});
            lowEnd++;
        }

        $scope.selectedTags = [];
        $scope.selectedTagFilters = [];
        $scope.total = 0;

        $scope.gridOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            modifierKeysToMultiSelect: true,
            //  enableCellEditOnFocus: true,
            rowHeight: 50,
            noUnselect: false,
            enableSelectAll: true,
            enableFiltering: true,
            columnDefs: [
                // default
                { field: 'name', filter: {
                    placeholder: 'Filter by name'
                },
                    headerCellClass: 'gridHeader',
                    cellClass: 'gridCell'
                },
                { field: 'date',
                    noTerm: true,
                    cellFilter: 'date:\'dd/MM/yyyy\'',
                    width: '100',
                    editableCellTemplate: '<input type="text" datepicker-popup="dd/MM/yyyy" datepicker-append-to-body=true ng-model="row.entity.date" />',
                    headerCellClass: 'gridHeader'
                },
                // no filter input
                { field: 'comment', enableFiltering: false, filter: {
                    noTerm: true,
                    condition: function (searchTerm, cellValue) {
                        return cellValue.match(/a/);
                    }
                },
                    headerCellClass: 'gridHeader'
                },
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
                    ],
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.price | currency:"€"}}</div>',
                    headerCellClass: 'gridHeader'
                },
                // custom condition function
                {
                    field: 'amount', width: '100', enableFiltering: false, editableCellTemplate: 'ui-grid/dropdownEditor',
                    editDropdownOptionsArray: $scope.amounts,
                    headerCellClass: 'gridHeader'
                },
                { field: '_tags',
                    cellTemplate: '<div ng-repeat="tag in row.entity._tags track by tag._id"><komon-tags item="tag" mode="small"></komon-tags></div>',
                    enableFiltering: false,
                    headerCellClass: 'gridHeader'
                }
            ]
        }
        ;


        //Open datepicker
        $scope.openDatepicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        //Open datapicker for quick month switch
        $scope.openSwitch = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.switchOpened = true;
        };

        $scope.komonerId = "54c7a0c902dbfa0c1f0afe5a";
        $scope.komoner = {
            name: "Komo"
        };

//Get all expenses of komoner
        $scope.getKomonerExpenses = function () {
            expenseService.getExpensesOfKomoner($scope.komonerId).then(function (result) {
                $scope.expenses = result;
                $scope.gridOptions.data = $scope.expenses;
            });
        };

//Get all tags of komoner
        $scope.getKomonerTags = function () {
            tagsService.getKomonerTags($scope.komonerId).then(function (result) {
                $scope.komonerTags = result;
            });
        };


//Empty the add expense form
        function emptyForm() {
            $scope.name = null;
            $scope.tags = null;
            $scope.comment = null;
            $scope.price = null;
            $scope.amount = $scope.amounts[0];
            $scope.date = moment().format('YYYY-MM-DD');
            $scope.addExpense.$setPristine();
        }

//Display mode for datapicker quick month switch
        $scope.dateSwitchOptions =
        {
            minMode: "month"
        };

//Default displayed value
        $scope.dateSwitch = moment().format('MMMM YYYY');

//Quick month switch
        $scope.switchMonth = function (date) {

            var newYear = moment(date).format('YYYY');
            var newMonth = moment(date).format('M');

            expenseService.getExpenseByMonth($scope.komonerId, newYear, newMonth).then(function (result) {
                $scope.expenses = result;
                $scope.gridOptions.data = $scope.expenses;
            });

        };

//Quick month switch forward
        $scope.prevMonth = function () {
            $scope.dateSwitch = moment($scope.dateSwitch).subtract(1, 'month');
            $scope.switchMonth($scope.dateSwitch);
            $scope.dateSwitch = moment($scope.dateSwitch).format('MMMM YYYY');
        };


//Quick month switch backwards
        $scope.nextMonth = function () {
            $scope.dateSwitch = moment($scope.dateSwitch).add(1, 'month');
            $scope.switchMonth($scope.dateSwitch);
            $scope.dateSwitch = moment($scope.dateSwitch).format('MMMM YYYY');
        };


//Add an expense
        $scope.addKomonerExpense = function () {

            //Get ids of selected tags
            var selectedTagsIds = _.pluck($scope.selectedTags, '_id');

            var expense = {
                _komoner: $scope.komonerId,
                name: $scope.name,
                date: $filter('date')($scope.date, 'shortDate', 'fr_FR'),
                comment: $scope.comment,
                _tags: selectedTagsIds,
                amount: $scope.amount.value,
                price: $scope.price === null || angular.isUndefined($scope.price) ? 0 : $scope.price.replace(",", ".")
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

        function initialize() {
            //Default date
            $scope.switchMonth(new Date());
            $scope.getKomonerTags();
            $scope.amount = $scope.amounts[0];
            $scope.date = moment().format('YYYY-MM-DD');
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

            });

        };

        $scope.$watch('alert', function () {
            if ($scope.alert != null) {
                $timeout(function () {
                    $scope.alert = null;
                }, 3500);
            }
        });

        $scope.tagFilter = function (entry) {
            var tags = entry._tags;
            //Check if all selected tag filters are in the entry tags
            /*        console.log($scope.selectedTagFilters);
             _.forEach($scope.selectedTagFilters, function(selectedTagFilter) {
             console.log(_.findIndex(tags, selectedTagFilter));
             if(!_.findIndex(tags, selectedTagFilter >= 0))
             {
             return false;
             }
             });

             return true;*/

            for (var i = 0; i < $scope.selectedTagFilters.length; i++) {
                if (!$scope.isInArray($scope.selectedTagFilters[i], tags)) {
                    return false;
                }
            }

            return true;
        };

        //Checks if element is in array
        $scope.isInArray = function (element, array) {
            for (var i = 0; i < array.length; i++) {

                if (angular.equals(array[i], element)) {
                    return true;
                }
            }
            return false;
        };

        $scope.$on('updateFilters', function (event, data) {
            // Filters the full set and hands the result to the grid.
            $scope.updateFilters();
        });

        $scope.updateFilters = function () {
            $scope.gridOptions.data = $filter('filter')($scope.expenses, $scope.tagFilter);
        };

        var modalOptions = {
            closeButtonText: 'Close',
            headerText: 'Your',
            secondHeaderText: ' tags',
            bodyText: 'Here you can add, remove, or edit tags !'
        };

        var modalParameters = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'js/tags/tagManageModal.tpl.html',
            size: 'lg',
            scope: $scope
        };

        $scope.manageTags = function (){
            $scope.manageTagsModal = modalService.showModal(modalParameters, modalOptions);
        };



    }]).filter("total", function () {
    return function (items, field) {
        var total = 0, i = 0;
        if (!angular.isUndefined(items)) {
            for (i = 0; i < items.length; i++) {
                total += items[i][field] * items[i]['amount'];
            }
        }
        return total;
    }
});
