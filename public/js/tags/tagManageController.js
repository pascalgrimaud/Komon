angular.module('komon.controllers').controller('tagManageController', ['$scope', 'alertService', '$filter', '$interval', '$timeout', 'tagsService',
    function ($scope, alertService, $filter, $interval, $timeout, tagsService) {

    $scope.selectedManagedTags = [];

    $scope.removeTags = function()
    {
         _.forEach($scope.selectedManagedTags, function(selectedTag) {
             _.remove($scope.komonerTags, {
                 _id: selectedTag._id
             });
             tagsService.deleteKomonerTag(selectedTag).then(function (result) {
             alertService.success("Removed tags !");
             });
        });
        $scope.selectedManagedTags = [];
    };

    $scope.addTag = function()
    {
        var tag =
        {
            _komoner: $scope.komonerId,
            name: $scope.tagName,
            color: $scope.tagColor,
            image: "vegetables.png"
        };

        tagsService.addKomonerTag(tag).then(function (result) {
            alertService.success("Tag " + tag.name + " !");
            $scope.getKomonerTags();
        });
    };

}]);