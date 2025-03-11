//data.js
angular
    .module('app')
    .factory('DataSrvc', DataSrvc)

DataSrvc.$inject = ['$http'];
function DataSrvc($http) {

    return {
        getData: function (data, url) {
            var returnValue = 'Service Layer';
            console.log(returnValue + ' ' + url);

            var data = {
                //user_id: user.id
            };

            var config = {
                params: data,
                headers: { 'Accept': 'application/json' }
            };

            return $http.get('http://apidev.accuweather.com' + url, config);

            //$http.get('http://apidev.accuweather.com' + url, config)
            //    .then(function (response) {
            //        //if (response.data.success == true) {

            //        //} else {

            //        //}


            //    // process response here..
            //        alert('http success!!!');

            //    }, function (response) {

            //    }
            //);


            //result = $http({
            //    //url: AppConfigService.getUrlBaseApi() + url,
            //    url: 'http://apidev.accuweather.com' + url,
            //    dataType: 'json',
            //    method: 'GET',
            //    //params: { user_id: user.id }
            //    //data: data,
            //    xhrFields: { withCredentials: true },
            //    headers: {
            //        "Content-Type": "application/json",
            //        //"Access-Control-Allow-Origin": "*",
            //        //"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
            //        //"Access-Control-Allow-Headers": "Content-Type, Content-Range, Content-Disposition, Content-Description",
            //        //"ClientKey": "Commcare",
            //        //"UserId": "" + userId + "",
            //        //"Token": "" + token + "",
            //        //"LoggedIn": "" + loggedIn + ""
            //    }
            //})

            //return result;
        },
        getDataPost: function (data, url) {
            var returnValue = 'Service Layer';
            console.log(returnValue + ' ' + url);

            result = $http({
                //url: AppConfigService.getUrlBaseApi() + url,
                url: 'http://apidev.accuweather.com' + url,
                dataType: 'json',
                method: 'POST',
                //params: { user_id: user.id }
                data: data,
                xhrFields: { withCredentials: true },
                headers: {
                    "Content-Type": "application/json",
                    //"Access-Control-Allow-Origin": "*",
                    //"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
                    //"Access-Control-Allow-Headers": "Content-Type, Content-Range, Content-Disposition, Content-Description",
                    //"ClientKey": "Commcare",
                    //"UserId": "" + userId + "",
                    //"Token": "" + token + "",
                    //"LoggedIn": "" + loggedIn + ""
                }
            })

            return result;
        }
    };
}