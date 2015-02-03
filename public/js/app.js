'use strict';
angular.module('komon.constants', [])
    .constant("UP_CONFIG", {
        "nodePath": "/node/"
    });

angular.module('komon.services', ['komon.constants', 'ui.bootstrap', 'restangular']);
angular.module('komon.controllers', ['komon.services', 'ngAnimate', 'mwl.bluebird', 'angularMoment']);
angular.module('komon.directives', ['komon.controllers']);

var app = angular.module('komon', ['komon.controllers', 'komon.services', 'komon.directives', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav', 'ngTagsInput']);
