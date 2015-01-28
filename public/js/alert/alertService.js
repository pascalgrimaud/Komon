/**
 * Created by Komo on 28/01/2015.
 */

/**
 * Created by Komo on 27/01/2015.
 */

angular.module('komon.services').factory('alertService', [function () {

    var alertService = {};
    var alert;

    alertService.error = function (message) {
        return { type: 'success', msg: message};
    };

    alertService.warning = function (message) {
        return { type: 'warning', msg: message};
    };

    alertService.success = function (message) {
        return { type: 'success', msg: message};
    };

    return alertService;
}]);
