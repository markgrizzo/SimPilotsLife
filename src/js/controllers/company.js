angular.module('app').controller('CompanyCtrl', function ($scope, CompanySrvc, SessionSrvc) {

    $scope.companies = {};
    $scope.session = SessionSrvc.get('splSession')
    $scope.User = $scope.session.User;

    function getCompanyHiring(pilotId, careerId) {

        CompanySrvc.getCompanyHiring(pilotId, careerId)
            .then(function (data) {
                $scope.companies = data.Companies;
            });
    }

});