angular.module('app').controller('ManifestCtrl', function ($document, $uibModal, $scope, ManifestSrvc, LogbookSrvc, PassengerSrvc, SessionSrvc) {

    $scope.logbookSectors = {};
    $scope.logbookCareerSector = {};
    $scope.manifest = {};
    $scope.manifests = {};
    $scope.passengers = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    $scope.companyImage = 'img/companies/company_' + $scope.user.CompanyId + '.png';
    $scope.icaoFrom = "clt";
    $scope.icaoTo = "rdu";
    $scope.url = { src: "http://www.msn.com", title: "MSN" };

    $scope.viewManifest = function (manifestId) {

        getManifest($scope.user.PilotId, manifestId);
    };

    function getDailyManifest(pilotId) {

        ManifestSrvc.getDailyManifest(pilotId)
            .then(function (data) {
                $scope.manifests = data.Manifests;
            });
    }

    function getLogbookCareerSectorStats(pilotId, sectorId) {

        LogbookSrvc.getLogbookCareerSectorStats(pilotId, sectorId)
            .then(function (data) {
                $scope.logbookCareerSector = data.Logbook;
            });
    }

    function getLogbookSectors(pilotId, sectorId) {

        LogbookSrvc.getLogbookSectors(pilotId, sectorId)
            .then(function (data) {
                $scope.logbookSectors = data.Logbooks;
            });
    }

    function getManifest(pilotId, manifestId) {

        ManifestSrvc.getManifest(pilotId, manifestId)
            .then(function (data) {
                $scope.manifest = data.Manifest;

                getPassengers(pilotId, manifestId);
                getLogbookSectors(pilotId, $scope.manifest.SectorId);
                getLogbookCareerSectorStats(pilotId, $scope.manifest.SectorId);
            });
    }

    function getNextScheduledFlight(pilotId) {

        ManifestSrvc.getNextScheduledFlight(pilotId)
            .then(function (data) {
                $scope.manifest = data.Manifest;

                getPassengers(pilotId, $scope.manifest.ManifestId);
                getLogbookSectors(pilotId, $scope.manifest.SectorId);
                getLogbookCareerSectorStats(pilotId, $scope.manifest.SectorId);
            });
    }

    function getPassengers(pilotId, manifest) {

        PassengerSrvc.getPassengers(pilotId, manifest)
            .then(function (data) {
                $scope.passengers = data.Passengers;
            });
    }

    getDailyManifest($scope.user.PilotId);
    getNextScheduledFlight($scope.user.PilotId);
});