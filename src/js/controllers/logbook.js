angular.module('app').controller('LogbookCtrl', function ($document, $uibModal, $scope, LogbookSrvc, SessionSrvc) {

    $scope.logbook = {};
    $scope.logbooks = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    $scope.viewLogbook = function (logbookId) {

        getLogbook(logbookId);
    };

    function getLogbook(logbookId) {

        LogbookSrvc.getLogbook(logbookId)
            .then(function (data) {
                $scope.logbook = data.Logbook;
            });
    }

    function getLogbooks(pilotId) {

        LogbookSrvc.getLogbooks(pilotId)
            .then(function (data) {
                $scope.logbooks = data.Logbooks;

                // default to most recent flight
                $scope.logbook = $scope.logbooks[0];
            });
    }

    getLogbooks($scope.user.PilotId);

});

angular.module('app').controller('LogbookAircraftFamilyCtrl', function ($document, $uibModal, $scope, LogbookSrvc, SessionSrvc) {

    $scope.logbook = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.User = $scope.session.User;

    function getLogbookAircraftFamilyStats(pilotId, aircraftFamilyId) {

        LogbookSrvc.getLogbookAircraftFamilyStats(pilotId, aircraftFamilyId)
            .then(function (data) {
                $scope.logbook = data.Logbook;
            });
    }

    getLogbookAircraftFamilyStats($scope.User.PilotId, $scope.User.AircraftFamilyId);
});

angular.module('app').controller('LogbookCareerCtrl', function ($document, $uibModal, $scope, LogbookSrvc, SessionSrvc) {

    $scope.logbook = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.User = $scope.session.User;

    function getLogbookCareerStats(pilotId, careerId) {

        LogbookSrvc.getLogbookCareerStats(pilotId, careerId)
            .then(function (data) {
                $scope.logbook = data.Logbook;
            });
    }

    getLogbookCareerStats($scope.User.PilotId, $scope.User.CareerId);
});

angular.module('app').controller('LogbookPilotCtrl', function ($document, $uibModal, $scope, LogbookSrvc, SessionSrvc) {

    $scope.logbook = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.User = $scope.session.User;

    function getLogbookPilotStats(pilotId) {

        LogbookSrvc.getLogbookPilotStats(pilotId)
            .then(function (data) {
                $scope.logbook = data.Logbook;
            });
    }

    getLogbookPilotStats($scope.User.PilotId);
});