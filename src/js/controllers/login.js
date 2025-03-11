angular.module('app').controller('LoginCtrl', function ($scope, $state, LoginSrvc, SessionSrvc, UserSrvc) {

    $scope.user = {
        UserId: 0,
        Username: 'markgrizzo',
        FirstName: '',
        LastName: '',
        PilotId: 0,
        Password: 'pwd1234'
    };
    $scope.session = {
        User: {}
    };

    $scope.session.User = $scope.user;

    // remove sessions
    SessionSrvc.remove("splSession");

    $scope.register = function () {

        $state.go('appSimple.register');
    };

    //if ($scope.session === null) {
    //    $window.location.href = '#/login';
    //}

    $scope.login = function () {

        UserSrvc.login($scope.user.Username, $scope.user.Password)
            .then(function (data) {
                //$state.go('^.app');
                $state.go('app.main');
            });
    };

});