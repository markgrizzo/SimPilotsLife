angular.module('app').controller('UserCtrl', function ($document, $uibModal, $scope, SessionSrvc, UserSrvc) {

    $scope.session = SessionSrvc.get('splSession')
    $scope.user = $scope.session.User;

});