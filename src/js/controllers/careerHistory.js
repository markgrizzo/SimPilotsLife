angular.module('app').controller('CareerHistoryCtrl', function ($scope, CareerHistorySrvc, SessionSrvc) {

    $scope.careerHistories = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function getCareerHistory(pilotId) {

        CareerHistorySrvc.getCareerHistory(pilotId)
            .then(function (data) {
                $scope.careerHistories = data.CareerHistories;
            });
    }

    getCareerHistory($scope.user.PilotId);
});