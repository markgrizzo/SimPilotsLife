angular.module('app').controller('RosterCtrl', function ($document, $uibModal, $scope, PilotSrvc, RosterSrvc, SessionSrvc) {

    $scope.rosters = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;
    $scope.estimatedMonthlyIncome = 0;
    $scope.flightHrsScheduledMonth = 0;
    $scope.avgRating = 0.0;
    $scope.avgOnTimePct = 0.0

    $scope.companyImage = 'img/companies/company_' + $scope.user.CompanyId + '.png';

    function getEstimatedMonthlyIncome(pilotId) {

        RosterSrvc.getEstimatedMonthlyIncome(pilotId)
            .then(function (data) {
                $scope.estimatedMonthlyIncome = data.Roster.EstimatedMonthlyIncome;
            });
    }

    function getFlightHrsScheduledMonth(pilotId) {

        RosterSrvc.getFlightHrsScheduledMonth(pilotId)
            .then(function (data) {
                $scope.flightHrsScheduledMonth = data.Roster.FlightHrsScheduledMonth;
            });
    }

    function getMonthlyRoster(pilotId) {

        RosterSrvc.getMonthlyRoster(pilotId)
            .then(function (data) {
                $scope.rosters = data.Rosters;
                $scope.avgRating = 0.0;
                $scope.avgOnTimePct = 0.0;

                // Get average rating
                for (x = 0; x <= $scope.rosters.length - 1; x++) {
                    $scope.avgRating += $scope.rosters[x].Rating;
                    $scope.avgOnTimePct += $scope.rosters[x].OnTimePct;
                }

                $scope.avgRating = ($scope.avgRating / $scope.rosters.length)
                $scope.avgOnTimePct = ($scope.avgOnTimePct / $scope.rosters.length) * 100;
            });
    }

    function getPilot(pilotId) {

        PilotSrvc.getPilot(pilotId)
            .then(function (data) {
                $scope.pilot = data.Pilot;
            });
    }

    getEstimatedMonthlyIncome($scope.user.PilotId);
    getFlightHrsScheduledMonth($scope.user.PilotId);
    getMonthlyRoster($scope.user.PilotId);
    getPilot($scope.user.PilotId);
});