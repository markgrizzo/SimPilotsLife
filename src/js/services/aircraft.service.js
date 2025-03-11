angular.module('app').service('AircraftSrvc', function ($http, $q, $window, AppConfigSrvc, DataSrvc, GlobalSrvc, SessionSrvc) {

    return {
        getAircrafts: function () {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession')
            var url = AppConfigSrvc.getApiUrl() + 'api/aircraft/GetAircrafts';

            var data = {

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
                    "UserId": "" + session.User.UserId + "",
                    "Username": "" + session.User.Username + "",
                    "Token": "" + session.Token + ""
                }
            })
                .then(function (response) {
                    SessionSrvc.create(response.data);
                    deferred.resolve(response.data);
                }, function (error) {

                    if (parseInt(response.data.Message.Code) === -99) {
                        GlobalSrvc.logOut();
                    }
                });

            return deferred.promise;
        },
        getAircraftsAllowedByCareer: function (careerId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession')
            var url = AppConfigSrvc.getApiUrl() + 'api/aircraft/GetAircraftsAllowedByCareer';

            var data = {
                CareerId: careerId
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
                    "UserId": "" + session.User.UserId + "",
                    "Username": "" + session.User.Username + "",
                    "Token": "" + session.Token + ""
                }
            })
                .then(function (response) {
                    SessionSrvc.create(response.data);
                    deferred.resolve(response.data);
                }, function (error) {

                    if (parseInt(response.data.Message.Code) === -99) {
                        GlobalSrvc.logOut();
                    }
                });

            return deferred.promise;
        }
    };

});