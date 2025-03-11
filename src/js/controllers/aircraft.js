angular.module('app').controller('AircraftCtrl', function ($document, $uibModal, $scope, AircraftSrvc, LogbookSrvc, SessionSrvc) {

    $scope.aircrafts = {};
    $scope.session = SessionSrvc.get('splSession')
    $scope.User = $scope.session.User;

    function getAircraftsAllowedByCareer(careerId) {

        CompanySrvc.getAircraftsAllowedByCareer(careerId)
            .then(function (data) {
                $scope.aircrafts = data.Aircrafts;
            });
    }

    function getCareers() {

        AircraftSrvc.getAircrafts()
            .then(function (data) {
                $scope.aircrafts = data.Aircrafts;
            });
    }

    getCareers();
});