﻿angular.module('app').service('PilotTypeRatingSrvc', function ($http, $q, AppConfigSrvc, GlobalSrvc, SessionSrvc) {

    return {
        getPilotTypeRatings: function (pilotId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl();
            url = url + 'api/pilottyperating/GetPilotTypeRatings';

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
        }
    };

});