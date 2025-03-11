angular
    .module('app')
    .service('UserSrvc', UserSrvc)

UserSrvc.$inject = ['$http', '$q', '$window', 'AppConfigSrvc', 'DataSrvc', 'SessionSrvc'];
function UserSrvc($http, $q, $window, AppConfigSrvc, DataSrvc, SessionSrvc) {

    return {
        login: function (username, password) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession')
            var url = AppConfigSrvc.getApiUrl() + 'api/user/Login';

            var data = {

            };

            $http({
                method: 'POST',
                url: url,
                dataType: 'json',
                xhrFields: { withCredentials: true },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Username": "" + username + "",
                    "Password": "" + password + ""
                }
            }).then(function (response) {
                SessionSrvc.create(response.data); 
                deferred.resolve(response.data);
            });

            return deferred.promise;
        },
        register: function (user) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession')
            var url = AppConfigSrvc.getApiUrl() + 'api/user/Register';

            var data = {
                Username: user.Username,
                Password: user.Password,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email
            };

            $http({
                method: 'POST',
                url: url,
                dataType: 'json',
                data: data,
                xhrFields: { withCredentials: true },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Username": "" + user.Username + "",
                    "Password": "" + user.Password + ""
                }
            }).then(function (response) {
                SessionSrvc.create(response.data);
                deferred.resolve(response.data);
            });

            return deferred.promise;
        }
    };
}