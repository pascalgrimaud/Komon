/**
 * Created by Komo on 25/01/2015.
 */

angular.module('komon.controllers').filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++) {
            input.push(i);
        }
        return input;
    };
});