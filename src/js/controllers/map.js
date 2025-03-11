angular.module('app').controller('RouteMapCtrl', function ($scope, HubSrvc, ProfileSrvc, RankSrvc, RouteMapSrvc, RouteSrvc, SessionSrvc) {

    $scope.hubHomeBase = {};
    $scope.hubs = {};
    $scope.mapCenter = {
        lat: 0,
        long: 0
    };
    $scope.mapZoom = 7;
    $scope.markers = [];
    $scope.maxFlightDistance = 0;
    $scope.profile = {};
    $scope.rank = {};
    $scope.routes = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    $scope.openInfoWindow = function (e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

    $scope.getRadius = function () {

        var oneNauticalMilePerRadius = 1850;
        var radius = oneNauticalMilePerRadius * $scope.maxFlightDistance;

        return radius;
    }

    var createMarker = function (info) {

        $scope.markers.push(info);
    }

    function getHomeBase(pilotId) {

        HubSrvc.getHomeBase(pilotId)
            .then(function (data) {

                $scope.hubHomeBase = data.Hub;
                //setHomeBase($scope.hubHomeBase);
            });
    }

    function getHubs(pilotId) {
        HubSrvc.getHubs(pilotId)
            .then(function (data) {

                $scope.hubs = data.Hubs;
                setHubs($scope.hubs, $scope.profile);

                getRoutesDepartingFromHubs($scope.user.PilotId);
            });
    }

    function getProfile(pilotId) {

        ProfileSrvc.getProfile(pilotId)
            .then(function (data) {

                $scope.profile = data.Profile;

                // Set the map zoom 
                setMapZoom($scope.profile.CareerId);

                // Center map on current pilot location
                $scope.mapCenter.lat = $scope.profile.CurrentLocationLatitude;
                $scope.mapCenter.long = $scope.profile.CurrentLocationLongitude;

                getHubs($scope.user.PilotId);
            });
    }

    function getRoutesDepartingFromHubs(pilotId) {
        RouteSrvc.getRoutesDepartingFromHubs(pilotId)
            .then(function (data) {

                $scope.routes = data.Routes;
                setRoutes($scope.routes, $scope.profile);
            });
    }

    function setCurrentLocation(profile) {

        var icon = 'https://maps.google.com/mapfiles/kml/shapes/airports.png';

        var city = {
            city: profile.CurrentLocationCity,
            desc: profile.CurrentLocationAirportName + ' (Current Location)',
            lat: profile.CurrentLocationLatitude,
            long: profile.CurrentLocationLongitude,
            icon: icon
        };

        createMarker(city);
    }

    function setHomeBase(hub) {

        var icon = 'https://maps.google.com/mapfiles/kml/paddle/stop.png';

        var city = {
            city: hubs[i].City,
            desc: hubs[i].AirportName,
            lat: hubs[i].Latitude,
            long: hubs[i].Longitude,
            icon: icon
        };

        createMarker(city);
    }

    function setHubs(hubs, profile) {
        
        var icon = '';
        var desc = '';

        for (i = 0; i < hubs.length; i++) {
            desc = hubs[i].AirportName;
            //icon = 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png';
            icon = 'http://www.google.com/mapfiles/dd-start.png';

            if (hubs[i].IsHomeBase === true) {
                icon = 'http://maps.google.com/mapfiles/kml/paddle/grn-stars.png';
            }

            if (hubs[i].Icao === profile.CurrentLocationIcao) {
                icon = 'http://maps.google.com/mapfiles/kml/shapes/airports.png';
                desc = hubs[i].AirportName + ' (Current Location)';
            }

            var city = {
                city: hubs[i].City,
                desc: desc,
                lat: hubs[i].Latitude,
                long: hubs[i].Longitude,
                icon: icon
            };

            createMarker(city);
        }
    }

    function setMap() {

        RankSrvc.getRank($scope.user.RankId)
            .then(function (data) {

                $scope.rank = data.Rank;
                $scope.maxFlightDistance = $scope.rank.FlightDistance;
                getProfile($scope.user.PilotId);
            });
    }

    function setMapZoom(careerId) {

        switch (careerId) {
            case 1:
                $scope.mapZoom = 8;
                break;
            case 2:
                $scope.mapZoom = 8;
                break;
            case 3:
                $scope.mapZoom = 5;
                break;
            case 4:
                $scope.mapZoom = 4;
                break;
            case 5:
                $scope.mapZoom = 5;
                break;
            case 6:
                $scope.mapZoom = 5;
                break;
            case 7:
                $scope.mapZoom = 5;
                break;
            default:
                $scope.mapZoom = 7;
        }
    }

    function setRoutes(routes, profile) {

        var icon = '';
        var desc = '';

        for (i = 0; i < routes.length; i++) {

            icon = '';
            desc = routes[i].IcaoToAirportName;

            // Check to see if pilot is at airport away from hub
            if (routes[i].IcaoTo.trim() === profile.CurrentLocationIcao) {
                icon = 'http://maps.google.com/mapfiles/kml/shapes/airports.png';
                desc = routes[i].IcaoToAirportName + ' (Current Location)';
            }

            var city = {
                city: routes[i].IcaoToCity,
                desc: desc,
                lat: routes[i].IcaoToLatitude,
                long: routes[i].IcaoToLongitude,
                icon: 'http://www.google.com/mapfiles/marker.png'
                //icon: icon
            };

            createMarker(city);
        }
    }

    setMap();
});