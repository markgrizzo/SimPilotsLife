angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/login');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['node_modules/font-awesome/css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'node_modules/chart.js/dist/Chart.min.js',
            'node_modules/angular-chart.js/dist/angular-chart.min.js'
          ]
        }]);
      }],
    }
  })
    .state('app.main', {
        url: '/dashboard',
        templateUrl: 'views/main.html',
        //page title goes here
        ncyBreadcrumb: {
            label: 'Home',
        },
        //page subtitle goes here
        params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
        resolve: {
            loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([
                {
                serie: true,
                name: 'chart.js',
                files: [
                    'node_modules/chart.js/dist/Chart.min.js',
                    'node_modules/angular-chart.js/dist/angular-chart.min.js'
                ]
                },
            ]);
            }],
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
                files: ['js/controllers/main.js']
            });
            }]
        }
    })

    .state('appSimple', {
        abstract: true,
        templateUrl: 'views/common/layouts/simple.html',
        resolve: {
            loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load CSS files
            return $ocLazyLoad.load([{
                serie: true,
                name: 'Font Awesome',
                files: ['node_modules/font-awesome/css/font-awesome.min.css']
            },{
                serie: true,
                name: 'Simple Line Icons',
                files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
            }]);
            }],
        }
    })

    // Additional Pages
    .state('appSimple.login', {
        url: '/login',
        templateUrl: 'views/pages/login.html'
      })

    .state('app.roster', {
        url: '/roster',
        templateUrl: 'views/roster/roster.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: ['js/controllers/roster.js']
                });
            }]
        }
    })

    .state('app.manifest', {
        url: '/manifest',
        templateUrl: 'views/manifest/manifest.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: ['js/controllers/manifest.js']
                });
            }]
        }
    })

    .state('app.googlemaps', {
        url: '/googlemaps',
        templateUrl: 'views/google-maps.html'
      })

      .state('app.finance', {
          url: '/finance',
          templateUrl: 'views/finance/finance.html',
          resolve: {
              loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      files: ['js/controllers/transaction.js']
                  });
              }]
          }
      })

    .state('app.logbook', {
        url: '/logbook',
        templateUrl: 'views/logbook/logbook.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: ['js/controllers/logbook.js']
                });
            }]
        }
    })

    .state('app.hangar', {
        url: '/hangar',
        templateUrl: 'views/hangar/hangar.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: ['js/controllers/hangar.js']
                });
            }]
        }
      })

    .state('app.route', {
        url: '/route',
        templateUrl: 'views/route/routes.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: ['js/controllers/route.js']
                });
            }]
        }
      })

    .state('app.hub', {
        url: '/hub',
        templateUrl: 'views/hub/hubs.html', 
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: ['js/controllers/hub.js']
                });
            }]
        }
      })

      .state('app.routeMap', {
          url: '/routeMap',
          templateUrl: 'views/map/routeMap.html',
          resolve: {
              loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      files: ['js/controllers/map.js']
                  });
              }]
          }
      })
 
    .state('appSimple.register', {
        url: '/register',
        templateUrl: 'views/pages/register.html'
      })

    .state('appSimple.registerCareer', {
        url: '/registerCareer',
        templateUrl: 'views/pages/registerCareer.html'
    })

    .state('appSimple.404', {
        url: '/404',
        templateUrl: 'views/pages/404.html'
    })

    .state('appSimple.500', {
        url: '/500',
        templateUrl: 'views/pages/500.html'
    })
}]);
