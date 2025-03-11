angular.module('app').controller('ProfileCtrl', function ($document, $uibModal, $scope, ProfileSrvc, SessionSrvc) {

    var $ctrl = this;
    $scope.user = $scope.session.User;

    $scope.companyImage = 'img/companies/company_' + $scope.user.CompanyId + '.png';
    $scope.epauletImage = "";
    $scope.jsonObj = {};
    $scope.hangarId = '';
    $scope.profile = {};
    $scope.session = SessionSrvc.get('splSession');

    
    function getProfile(pilotId) {

        ProfileSrvc.getProfile(pilotId)
            .then(function (data) {
                $scope.profile = data.Profile;

                // Set epaulet
                $scope.epauletImage = '../img/epaulets/RankEpaulet_' + $scope.profile.CareerId + '_' + $scope.profile.RankOrder + '.png';
            });
    }

    getProfile($scope.user.PilotId);
});