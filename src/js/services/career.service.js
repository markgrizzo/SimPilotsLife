angular.module('app').service('CareerSrvc', function ($http, $q, $window, AppConfigSrvc, DataSrvc, GlobalSrvc, SessionSrvc) {

    return {
        getCareerChangesAvailable: function (pilotId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/career/GetCareerChangesAvailable';

            var data = {
                PilotId: pilotId
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
        getCareers: function () {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/career/GetCareers';

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
        startNewCareer: function (pilot) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/career/StartNewCareer';

            var data = {
                Pilot: pilot
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