angular.module('app').controller('ProcessCtrl', function ($scope, $state, MessageService, PilotSrvc, ProcessSrvc, SessionSrvc) {

    $scope.pilot = {};
    $scope.crudMessage = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;
    $scope.isCreateManifest = true;
    $scope.isProcessUntilNextRosterDay = false;

    $scope.processEndOfDay = function (pilotId, currentGameDateTimeUTC, isCreateManifest) {

        processEndOfDay(pilotId, currentGameDateTimeUTC, isCreateManifest);
    };

    function getPilot(pilotId) {

        PilotSrvc.getPilot(pilotId)
            .then(function (data) {
                $scope.pilot = data.Pilot;
            });
    }

    function processEndOfDay(pilotId, currentGameDateTimeUTC, isCreateManifest) {

        ProcessSrvc.processEndOfDay(pilotId, currentGameDateTimeUTC, isCreateManifest, $scope.isProcessUntilNextRosterDay)
            .then(function (data) {
                $scope.crudMessage = data.Message;

                if (parseInt(data.Message.Code) === 0) {

                    MessageService.addMessage('success', 'Current day has been processed.');

                    // Reload pilot data
                    getPilot($scope.user.PilotId);

                    //$state.go('app.main');
                    $state.reload();
                }
                else {
                    //
                }
            });
    }

    getPilot($scope.user.PilotId);
});