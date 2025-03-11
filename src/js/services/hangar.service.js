angular.module('app').service('HangarSrvc', function ($http, $q, AppConfigSrvc, GlobalSrvc, SessionSrvc) {

    return {
        activateHangar: function (pilotId, hangarId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl();
            url = url + 'api/hangar/Activate';

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
        deleteHangar: function (pilotId, hangarId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl();
            url = url + 'api/hangar/Delete';

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
        disableHangar: function (pilotId, hangarId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl();
            url = url + 'api/hangar/Disable';

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
        getHangar: function (hangarId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/hangar/Get';

            var data = {
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
        getHangarId: function (hangarId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/hangar/Get/' + hangarId;

            var data = {
                //UserId: session.User.UserId
            };

            $http({
                method: 'GET',
                url: url,
                dataType: 'json',
                xhrFields: { withCredentials: true },
                headers: {
                    "UserId": "" + session.User.UserId + "",
                    "Username": "" + session.User.Username + "",
                    "Token": "" + session.Token + ""
                }
            })
                .then(function (response) {
                    SessionSrvc.create(response.data);
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.resolve(error);
                });

            return deferred.promise;
        },
        getHangars: function (pilotId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/hangar/GetHangars';

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

            //$http({
            //    method: 'POST',
            //    url: url,
            //    dataType: 'json',
            //    data: data,
            //    xhrFields: { withCredentials: true },
            //    headers: {
            //        //'Access-Control-Allow-Origin': '*',
            //        //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            //        //'Access-Control-Allow-Methods': 'POST',
            //        //'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
            //        //'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token,PilotId',
            //        //'Access-Control-Allow-Headers': 'Authorization, Content-Type',
            //        //'Content-Type': 'application/json',
            //        'PilotId': '' + session.User.UserId + ''
            //    }
            //}).then(function (response) {
            //    deferred.resolve(response.data);

            //});
        },
        getHangarsAllowedByCareer: function (pilotId, careerId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/hangar/GetHangarsAllowedByCareer';

            var data = {
                PilotId: pilotId,
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

            //$http({
            //    method: 'POST',
            //    url: url,
            //    dataType: 'json',
            //    data: data,
            //    xhrFields: { withCredentials: true },
            //    headers: {
            //        //'Access-Control-Allow-Origin': '*',
            //        //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            //        //'Access-Control-Allow-Methods': 'POST',
            //        //'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
            //        //'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token,PilotId',
            //        //'Access-Control-Allow-Headers': 'Authorization, Content-Type',
            //        //'Content-Type': 'application/json',
            //        'PilotId': '' + session.User.UserId + ''
            //    }
            //}).then(function (response) {
            //    deferred.resolve(response.data);

            //});
        },
        getWeather: function (title) {
            var deferred = $q.defer();
            var url = '/locations/v1/search?q=charlotte,nc&apikey=hoArfRosT1215';
            var data = {};

            var config = {
                params: data,
                headers: { 'Accept': 'application/json' }
            };

            $http.get('http://apidev.accuweather.com' + url, config)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (response) {

                }
                );

            return deferred.promise;
        },
        insertPilotHangar: function (pilot) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/hangar/InsertPilotHangar';

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
        },
        updateSingle: function (data) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/hangar/UpdateSingle';

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
        updatePreFlightTimeMin: function (hangarId, value) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession');
            var url = AppConfigSrvc.getApiUrl() + 'api/hangar/UpdatePreFlightTimeMin';

            var data = {
                Hangar: hangar = {
                    HangarId: hangarId,
                    PreFlightTimeMin: value
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