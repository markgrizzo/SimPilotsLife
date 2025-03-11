angular.module('app').controller('CareerCtrl', function ($scope, CareerSrvc, SessionSrvc) {

    $scope.hangarId = '';
    $scope.profile = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

});

angular.module('app').controller('CareersCtrl', function ($scope, CareerSrvc) {

    $scope.careers = {};

    function getCareers() {

        CareerSrvc.getCareers()
            .then(function (data) {
                $scope.careers = data.Careers;
            });
    }

    getCareers();
});

angular.module('app').controller('CareerBannerCtrl', function ($document, $uibModal, $scope, $state, CareerSrvc, LogbookSrvc, SessionSrvc) {

    $scope.hangarId = '';
    $scope.careers = {};
    $scope.careersAvailable = {};
    $scope.pilot = {
        PilotId: 0,
        CareerId: 0,
        CompanyId: 0,
        HomeBaseIcao: '',
        AircraftId: 0,
        AircraftDescription: ''
    };
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function getCareerChangesAvailable(pilotId) {

        CareerSrvc.getCareerChangesAvailable(pilotId)
            .then(function (data) {
                $scope.careersAvailable = data.Career;
            });
    }

    function getLogbookCareerCompanyStatsAll(pilotId) {

        LogbookSrvc.getLogbookCareerCompanyStatsAll(pilotId)
            .then(function (data) {
                $scope.careers = data.Logbooks;
            });
    }

    function startNewCareer(pilot) {

        CareerSrvc.startNewCareer(pilot)
            .then(function (data) {
                if (parseInt(data.Message.Code) === 0) {

                    $state.go('app.main');
                    $state.reload();
                    //$route.reload();
                }
            });
    }

    $scope.isDefined = function (val) {

        if (angular.isDefined(val))
            return true;
        else
            return false;
    };

    $scope.startNewCareerModal = function (size, careerId, careerType, parentSelector) {

        $scope.input = {
            PilotId: $scope.user.PilotId,
            CareerId: careerId,
            CareerType: careerType
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalStartNewCareer.html',
            controller: 'ModalStartNewCareerCtrl',
            //controllerAs: '$scope',
            size: size,
            appendTo: parentElem,
            resolve: {
                input: function () {
                    return $scope.input;
                }
            }
        });

        modalInstance.result.then(function (output) {

            //alert('Selected Item2=' + output.CareerId + ' ' + output.CompanyId + ' ' + output.AircraftId + ' ' + output.AircraftDescription + ' ' + output.HomeBaseIcao);

            $scope.pilot = {
                PilotId: $scope.user.PilotId,
                CareerId: output.CareerId,
                CompanyId: output.CompanyId,
                HomeBaseIcao: output.HomeBaseIcao,
                AircraftId: output.AircraftId,
                AircraftDescription: output.AircraftDescription
            };

            startNewCareer($scope.pilot);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.startNewCareer = function (size, careerId, parentSelector) {

        $scope.startNewCareerModal(size, careerId, 'Career', parentSelector);
    };

    $scope.startNewJob = function (size, careerId, parentSelector) {

        $scope.startNewCareerModal(size, careerId, 'Job', parentSelector);
    };

    getCareerChangesAvailable($scope.user.PilotId);
    getLogbookCareerCompanyStatsAll($scope.user.PilotId);
});


// Modal Controllers
// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
angular.module('app').controller('ModalStartNewCareerCtrl', function ($scope, $uibModalInstance, input, AircraftSrvc, CareerSrvc, CompanySrvc, HangarSrvc) {

    $scope.input = input;

    $scope.aircraftDescription = '';
    $scope.aircrafts = {};
    $scope.careers = {};
    $scope.companies = {};
    $scope.icaoHomeBase = '';
    $scope.hangarsAllowedByCareer = {};
    $scope.homeBaseIcao = '';
    $scope.isUseOwnAircraft = false;
    $scope.selectedAircraft = {};
    $scope.selectedHangarAircraft = {};
    $scope.selectedCareer = {};
    $scope.selectedCareerId = $scope.input.CareerId;
    $scope.selectedCompany = {};

    function getAircraftsAllowedByCareer(careerId) {

        AircraftSrvc.getAircraftsAllowedByCareer(careerId)
            .then(function (data) {
                $scope.aircrafts = data.Aircrafts;
            });
    }

    function getCareers() {

        CareerSrvc.getCareers()
            .then(function (data) {
                $scope.careers = data.Careers;

                //defaultCareer = $scope.careers.CareerId = $scope.input.CareerId
                //$scope.selectedCareer = $scope.careers[$scope.input.CareerId - 1];
            });
    }

    function getCompanyHiring(pilotId, careerId) {

        CompanySrvc.getCompanyHiring(pilotId, careerId)
            .then(function (data) {
                $scope.companies = data.Companies;
            });
    }

    function getHangarsAllowedByCareer(pilotId, careerId) {

        HangarSrvc.getHangarsAllowedByCareer(pilotId, careerId)
            .then(function (data) {
                $scope.hangarsAllowedByCareer = data.Hangars;

                // If a pilot owns at least 1 aircraft in career, then default to true
                if ($scope.hangarsAllowedByCareer.length > 0) {
                    $scope.isUseOwnAircraft = true;
                }
                else {
                    $scope.isUseOwnAircraft = false;
                }
            });
    }

    $scope.ok = function () {

        output = {
            CareerId: $scope.selectedCareerId,
            CompanyId: $scope.selectedCompany.CompanyId,
            HomeBaseIcao: $scope.homeBaseIcao,
            AircraftId: $scope.selectedAircraft.AircraftId,
            AircraftDescription: $scope.aircraftDescription,
            IsUseOwnAircraft: $scope.isUseOwnAircraft
        };

        if ($scope.isUseOwnAircraft === true) {
            output.AircraftId = 0;
            output.AircraftDescription = '';
        }

        $uibModalInstance.close(output);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    getCareers();
    getAircraftsAllowedByCareer($scope.input.CareerId);
    getCompanyHiring($scope.input.PilotId, $scope.input.CareerId);
    getHangarsAllowedByCareer($scope.input.PilotId, $scope.input.CareerId);
});
// (End) Modal Controllers