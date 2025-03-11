angular.module('app').service('GateSrvc', function ($http, $q, AppConfigSrvc, GlobalSrvc, SessionSrvc) {

    return {
        deleteGate: function (pilotId, gateId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl();
            url = url + 'api/gate/Delete';

            var data = {
                PilotId: pilotId,
                GateId: gateId
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
        getGates: function (pilotId, hangarId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/gate/GetGates';

            var data = {
                PilotId: pilotId,
                HangarId: hangarId
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
        getGatesAirport: function (pilotId, hangarId, icao) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/gate/getGatesAirport';

            var data = {
                PilotId: pilotId,
                HangarId: hangarId,
                Icao: icao
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
        saveGate: function (gate) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl();
            url = url + 'api/gate/Save';

            var data = {
                Gate: {
                    GateId: gate.GateId,
                    HangarId: gate.HangarId,
                    Icao: gate.Icao,
                    Gate: gate.Gate
                }
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