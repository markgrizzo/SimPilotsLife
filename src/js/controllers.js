angular.module('app').controller('AppCtrl', function ($scope, SessionSrvc, UserSrvc) {

    $scope.user = {
        UserId: 1,
        Username: 'markgrizzo',
        FirstName: 'Mark',
        LastName: 'Rizzo',
        PilotId: 1
    };
    $scope.session = {
        User: {}
    };

    $scope.session.User = $scope.user;
    SessionSrvc.create($scope.session);

    function login() {

        UserSrvc.login()
            .then(function (data) {

            });
    }

    login();
});