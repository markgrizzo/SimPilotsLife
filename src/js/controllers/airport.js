angular.module('app').controller('AirportCtrl', function ($scope, AirportSrvc) {

    $scope.airport = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function getAirport(icao) {

        AirportSrvc.getAirport(icao)
            .then(function (data) {
                $scope.airport = data.Airport;
            });
    }
});