angular.module('app').controller('DropDownCtrl', function ($scope, AircraftSrvc, SessionSrvc) {

    $scope.aircraftsAllowedByCareer = {};
    $scope.session = SessionSrvc.get('splSession')
    $scope.User = $scope.session.User;

    $scope.ddGetAircraftsAllowedByCareer = function (careerId) {

        AircraftSrvc.getAircraftsAllowedByCareer(careerId)
            .then(function (data) {
                $scope.aircraftsAllowedByCareer = data.Aircrafts;
            });
    }
});