angular.module('app').controller('PilotCtrl', function ($document, $uibModal, $scope, PilotSrvc, SessionSrvc) {

    $scope.pilot = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function getPilot(pilotId) {

        PilotSrvc.getPilot(pilotId)
            .then(function (data) {
                $scope.pilot = data.Pilot;
            });
    }

    getPilot($scope.user.PilotId);
});