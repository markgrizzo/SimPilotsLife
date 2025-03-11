// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
    .module('app', [
        'ui.router',
        'oc.lazyLoad',
        'ncy-angular-breadcrumb',
        'angular-loading-bar',
        'ngAnimate',
        'ngSanitize',
        'ui.bootstrap',
        'ngMap'
    ])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;
    }]).constant("CONSTANTS", {
        MESSAGE_DURATION: {
            Alert: 4000,
            Danger: 4000,
            Default: 2500,
            Info: 3000,
            Success: 3000,
            Warning: 3000
        }
    })

    //.config(['constants', function (constants) {
    //    constants.MessageDuration.Alert = 4000;
    //    constants.MessageDuration.Danger = 4000;
    //    constants.MessageDuration.Default = 2500;
    //    constants.MessageDuration.Info = 3000;
    //    constants.MessageDuration.Success = 3000;
    //    constants.MessageDuration.Warning = 3000;
    //}])

    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
      $rootScope.$on('$stateChangeSuccess',function(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });

      $rootScope.$on('mapInitialized', function (evt, map) {
          $rootScope.mymap = map;
          $rootScope.$apply();
      });

      $rootScope.$state = $state;
      return $rootScope.$stateParams = $stateParams;
    }]);
