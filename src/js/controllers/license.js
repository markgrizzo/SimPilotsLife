angular.module('app').controller('LicenseCtrl', function ($document, $uibModal, $scope, LicenseSrvc, SessionSrvc) {

    $scope.licenses = {};
    $scope.session = SessionSrvc.get('splSession')
    $scope.User = $scope.session.User;

    function getLicenses() {

        LicenseSrvc.getLicenses()
            .then(function (data) {
                $scope.licenses = data.Licenses;
            });
    }

    getLicenses();
});