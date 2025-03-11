angular
    .module('app')
    .service('GlobalSrvc', GlobalSrvc)

GlobalSrvc.$inject = ['$state', 'SessionSrvc'];
function GlobalSrvc($state, SessionSrvc) {

    return {
        logOut: function () {

            // remove sessions
            SessionSrvc.remove("splSession");

            $state.go('appSimple.login');
        }
    };
}