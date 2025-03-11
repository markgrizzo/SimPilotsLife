angular.module('app').controller('NavCtrl', function ($scope, SessionSrvc) {

    $scope.session = SessionSrvc.get('splSession')

});