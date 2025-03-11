angular.module('app').service('RouteMapSrvc', function ($http, $q, $window, AppConfigSrvc, GlobalSrvc, SessionSrvc) {

    return {
        getCareerRanks: function (careerId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession')
            var url = AppConfigSrvc.getApiUrl() + 'api/rank/GetCareerRanks';

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
        },
        getRank: function (rankId) {
            var deferred = $q.defer();
            var session = SessionSrvc.get('splSession')
            var url = AppConfigSrvc.getApiUrl() + 'api/rank/Get';

            var data = {
                RankId: rankId
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