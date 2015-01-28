'use strict';
angular.module('komon.constants', [])
    .constant("UP_CONFIG", {
        "nodePath": "/node/"
    });

angular.module('komon.services', ['komon.constants', 'ui.bootstrap', 'restangular']);
angular.module('komon.controllers', ['komon.services', 'ngAnimate', 'mwl.bluebird']);
angular.module('komon.directives', []);

var app = angular.module('komon', ['komon.controllers', 'komon.services', 'komon.directives', 'ngAnimate', 'ui.grid'])
    /*.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customers', route.resolve('Customers'))
            .when('/customerorders/:customerID', route.resolve('CustomerOrders'))
            .when('/orders', route.resolve('Orders'))
            .otherwise({ redirectTo: '/customers' });}]*/
    ;
