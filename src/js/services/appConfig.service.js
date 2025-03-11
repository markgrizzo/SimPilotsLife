angular.module('app').service('AppConfigSrvc', function ($http) {

    return {
        getEnvironment: function () {
            // Default environment variables
            return 'prod';
        },
        getApiUrl: function () {
            var environment = this.getEnvironment();
            var url;

            if (environment === 'local') {
                url = 'http://localhost:29707/';
            } else
                if (environment === 'dev') {
                    url = 'http://localhost:29707/';
                } else
                    if (environment === 'prod') {
                        url = 'http://SimPilotsLifeApi.azurewebsites.net/';
                    } else {
                        url = 'http://localhost:29707/';
                    }

            return url;
        }
    };
});