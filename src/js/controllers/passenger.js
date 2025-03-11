angular.module('app').controller('PassengerCtrl', function ($document, $uibModal, $scope, PassengerSrvc, SessionSrvc) {

    $scope.passengers = {};
    $scope.session = SessionSrvc.get('splSession')
    $scope.user = $scope.session.User;

    function getPassengers(pilotId, manifest) {

        PassengerSrvc.getPassengers(pilotId, manifest)
            .then(function (data) {
                $scope.passengers = data.Passengers;
            });
    }

});