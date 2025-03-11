angular.module('app').controller('RouteCtrl', function ($uibModal, $scope, PilotSrvc, RankSrvc, RouteSrvc, SectorSrvc, SessionSrvc) {

    $scope.pilot = {};
    $scope.rank = {};
    $scope.routes = {};
    $scope.routesRemaining = 0;
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function deleteRoute(routeId) {

        RouteSrvc.deleteRoute($scope.user.PilotId, routeId)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    // Reload information
                    //getRank($scope.user.RankId);
                    //getRoutesDepartingFromHubs($scope.user.PilotId);
                    init($scope.user.PilotId, $scope.user.RankId);
                }
                else {
                    //
                }
            });
    }

    function disableRoute(routeId) {

        RouteSrvc.disableRoute($scope.user.PilotId, routeId, $scope.pilot.CurrentGameDateTimeUTC)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    // Reload information
                    //getRank($scope.user.RankId);
                    //getRoutesDepartingFromHubs($scope.user.PilotId);
                    init($scope.user.PilotId, $scope.user.RankId);
                }
                else {
                    //
                }
            });
    }

    function getPilot(pilotId) {

        PilotSrvc.getPilot(pilotId)
            .then(function (data) {
                $scope.pilot = data.Pilot;
            });
    }

    function getRank(rankId) {

        RankSrvc.getRank(rankId)
            .then(function (data) {
                $scope.rank = data.Rank;
            });
    }

    function getRoutesDepartingFromHubs(pilotId) {
        RouteSrvc.getRoutesDepartingFromHubs(pilotId)
            .then(function (data) {

                $scope.routes = data.Routes;

                // Calculate remaing routes available to open
                $scope.routesRemaining = $scope.rank.NumRoutes - $scope.routes.length;
            });
    }

    function insertRoute(icaoFrom, icaoTo, pilotId, currentGameDateTimeUTC) {

        RouteSrvc.insertRoute(icaoFrom, icaoTo, pilotId, currentGameDateTimeUTC)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    // Reload information
                    //getRank($scope.user.RankId);
                    //getRoutesDepartingFromHubs($scope.user.PilotId);
                    init($scope.user.PilotId, $scope.user.RankId);
                }
                else {
                    MessageService.addMessage('warning', data.Message.ApplicationMessage);
                }
            });
    }

    function init(pilotId, rankId) {

        // Get pilot information
        PilotSrvc.getPilot(pilotId)
            .then(function (data) {
                $scope.pilot = data.Pilot;

                // Get rank information
                RankSrvc.getRank(rankId)
                    .then(function (data) {
                        $scope.rank = data.Rank;

                        // Get list of routes
                        RouteSrvc.getRoutesDepartingFromHubs(pilotId)
                            .then(function (data) {

                                $scope.routes = data.Routes;

                                // Calculate remaing routes available to open
                                $scope.routesRemaining = $scope.rank.NumRoutes - $scope.routes.length;
                            });
                    });
            });
    }

    $scope.confirmDeleteRouteModal = function (size, route, parentSelector) {

        $scope.input = {
            Route: route
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalDeleteRoute.html',
            controller: 'ModalDeleteRouteCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                input: function () {
                    return $scope.input;
                }
            }
        });

        modalInstance.result.then(function (output) {

            if (output.IsDelete === true) {
                deleteRoute(route.RouteId);
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.confirmDisableRouteModal = function (size, route, parentSelector) {

        $scope.input = {
            Route: route
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalDisableRoute.html',
            controller: 'ModalDisableRouteCtrl',
            //controllerAs: '$scope',
            size: size,
            appendTo: parentElem,
            resolve: {
                input: function () {
                    return $scope.input;
                }
            }
        });

        modalInstance.result.then(function (output) {

            if (output.IsDisable === true) {
                disableRoute(route.RouteId);
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.createRouteModal = function (size, parentSelector) {

        $scope.input = {
            PilotId: $scope.user.PilotId,
            CareerId: $scope.user.CareerId,
            RankId: $scope.user.RankId,
            RouteId: 0,
            RoutesAllowed: $scope.rank.NumRoutes,
            RoutesOwned: $scope.routes.length,
            DistanceAllowed: $scope.rank.FlightDistance
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalRoute.html',
            controller: 'ModalRouteCtrl',
            //controllerAs: '$scope',
            size: size,
            appendTo: parentElem,
            resolve: {
                input: function () {
                    return $scope.input;
                }
            }
        });

        modalInstance.result.then(function (output) {

            insertRoute(output.IcaoFrom, output.IcaoTo, $scope.user.PilotId, $scope.pilot.CurrentGameDateTimeUTC);

        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.createSectorModal = function (size, route, parentSelector) {

        $scope.input = {
            Route: route,
            CareerId: $scope.user.CareerId
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
         
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalSector.html',
            controller: 'ModalSectorCtrl',
            //controllerAs: '$scope',
            size: size,
            windowClass: 'modal-popup-1000',
            appendTo: parentElem,
            resolve: {
                input: function () {
                    return $scope.input;
                }
            }
        });

        modalInstance.result.then(function () {

            //sector = {
            //    SectorId: output.SectorId,
            //    PilotId: $scope.user.PilotId,
            //    RouteId: output.RouteId,
            //    HangarId: output.HangarId,
            //    DepartureGate: output.DepartureGate,
            //    ArrivalGate: output.ArrivalGate,
            //    IsActive: output.IsActive
            //};

            //insertSector(sector);

        }, function () {
            getRoutesDepartingFromHubs($scope.user.PilotId);

            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    init($scope.user.PilotId, $scope.user.RankId);
});

// Modal Controllers
angular.module('app').controller('ModalDeleteRouteCtrl', function ($scope, $uibModalInstance, input) {

    $scope.route = input.Route;

    $scope.delete = function () {

        output = {
            IsDelete: true
        };

        $uibModalInstance.close(output);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('app').controller('ModalDisableRouteCtrl', function ($scope, $uibModalInstance, input) {

    $scope.route = input.Route;

    $scope.disable = function () {

        output = {
            IsDisable: true
        };

        $uibModalInstance.close(output);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('app').controller('ModalRouteCtrl', function ($scope, $uibModalInstance, input, AirportSrvc, FormulaSrvc, HubSrvc) {

    $scope.input = input;

    $scope.airportFrom = {};
    $scope.airportTo = {};
    $scope.distance = '';
    $scope.distanceAllowed = $scope.input.DistanceAllowed;
    $scope.hubs = {};
    $scope.isSaveAllowed = false;
    $scope.route = {};
    $scope.routeEdit = {
        RouteId: 0,
        IcaoFrom: '',
        IcaoFromAirportName: '',
        IcaoTo: '',
        IcaoToAirportName: '',
        HubId: 0,
        HangarId: 0,
        Distance: 0
    };
    $scope.routeFee = 0;
    $scope.selectedHub = {};

    function calculateDistance(icaoFrom, icaoTo) {

        FormulaSrvc.calculateDistance(icaoFrom, icaoTo)
            .then(function (data) {

                $scope.distance = data.Value.Distance;
                calculateRouteFee($scope.distance);

                // If flight distance is too long, then do not allow user to save route
                if ($scope.distance <= $scope.distanceAllowed) {
                    $scope.isSaveAllowed = true;
                }
            });
    }

    function calculateRouteFee(distance) {

        FormulaSrvc.calculateRouteFee(distance)
            .then(function (data) {

                $scope.routeFee = data.Value.Data.Value;
            });
    }

    function getHubsOpen(pilotId) {

        HubSrvc.getHubsOpen(pilotId)
            .then(function (data) {
                $scope.hubs = data.Hubs;
            });
    }

    $scope.getAirportFrom = function (icao) {

        $scope.distance = '';
        $scope.routeEdit.IcaoFromAirportName = '';
        $scope.isSaveAllowed = false;

        if (icao.length > 0) {
            AirportSrvc.getAirport(icao)
                .then(function (data) {
                    $scope.routeEdit.IcaoFromAirportName = data.Airport.AirportName;

                    // Calculate the distance betwwen both airports
                    if ($scope.routeEdit.IcaoFromAirportName.length > 0 && $scope.routeEdit.IcaoToAirportName.length > 0) {
                        calculateDistance($scope.routeEdit.IcaoFrom, $scope.routeEdit.IcaoTo);
                    }
                });
        }
    };

    $scope.getAirportTo = function (icao) {

        $scope.distance = '';
        $scope.routeEdit.IcaoToAirportName = '';
        $scope.isSaveAllowed = false;

        if (icao.length > 0) {
            AirportSrvc.getAirport(icao)
                .then(function (data) {
                    $scope.routeEdit.IcaoToAirportName = data.Airport.AirportName;

                    // Calculate the distance betwwen both airports
                    // Do not allow a route to be created if a hub is set to pending close
                    if ($scope.selectedHub.HubId > 0 && $scope.selectedHub.IsPendingClose === false > 0 && $scope.routeEdit.IcaoToAirportName.length > 0) {
                        calculateDistance($scope.selectedHub.Icao, $scope.routeEdit.IcaoTo);
                    }
                });
        }
    };

    $scope.hubChange = function () {

        $scope.isSaveAllowed = false;

        // Calculate the distance betwwen both airports
        // Do not allow a route to be created if a hub is set to pending close
        if ($scope.selectedHub.HubId > 0 && $scope.selectedHub.IsPendingClose === false > 0 && $scope.routeEdit.IcaoToAirportName.length > 0) {
            calculateDistance($scope.selectedHub.Icao, $scope.routeEdit.IcaoTo);
        }
    };

    $scope.save = function () {

        output = {
            //IcaoFrom: $scope.routeEdit.IcaoFrom,
            IcaoFrom: $scope.selectedHub.Icao,
            IcaoTo: $scope.routeEdit.IcaoTo
        };

        $uibModalInstance.close(output);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    getHubsOpen($scope.input.PilotId);
});

angular.module('app').controller('ModalSectorCtrl', function ($scope, $uibModalInstance, input, GateSrvc, HangarSrvc, MessageService, SectorSrvc) {

    $scope.airportGates = '';
    $scope.careerId = input.CareerId;
    $scope.hangars = {};
    $scope.route = input.Route;
    $scope.selectedHangar = {};
    $scope.sectors = {};

    function getGatesAirport(pilotId, hangarId, icao) {

        GateSrvc.getGatesAirport(pilotId, hangarId, icao)
            .then(function (data) {
                $scope.airportGates = data.Gate;
            });
    }

    function getHangarsAllowedByCareer(pilotId, careerId) {

        HangarSrvc.getHangarsAllowedByCareer(pilotId, careerId)
            .then(function (data) {
                $scope.hangars = data.Hangars;
            });
    }

    function getSectors(pilotId, careerId, routeId) {

        SectorSrvc.getSectors(pilotId, careerId, routeId)
            .then(function (data) {
                $scope.sectors = data.Sectors;
                $scope.refreshAvailableHangars();
            });
    }

    $scope.addNew = function () {

        $scope.refreshAvailableHangars();

        $scope.sectors.push({
            'selected': false,
            'SectorId': 0,
            'HangarId': 0,
            'RouteId': $scope.route.RouteId,
            'DepartureGate': "",
            'ArrivalGate': "",
            'IsActiveSector': true
        });
    };

    $scope.delete = function (sectorId) {

        var pilotId = $scope.route.PilotId;
        var careerId = $scope.careerId;
        var routeId = $scope.route.RouteId;

        SectorSrvc.deleteSector(pilotId, sectorId)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    // Reload information
                    getSectors(pilotId, careerId, routeId);

                    getHangarsAllowedByCareer($scope.route.PilotId, $scope.careerId);
                    $scope.refreshAvailableHangars();

                    MessageService.addMessage('success', 'Sector has been deleted.');
                }
                else {
                    //
                }
            });
    };

    $scope.getGatesAirport = function (hangarId, icao) {

        var pilotId = $scope.route.PilotId;

        GateSrvc.getGatesAirport(pilotId, hangarId, icao)
            .then(function (data) {
                $scope.airportGates = data.Gate;
            });
    };

    $scope.refreshAvailableHangars = function () {

        var newHangarList = [];

        if ($scope.sectors.length > 0) {
            angular.forEach($scope.hangars, function (hangar) {

                // check to see if hangar is in sector list
                var i = null;
                var isExists = false;

                for (i = 0; $scope.sectors.length > i; i += 1) {
                    if ($scope.sectors[i].HangarId === hangar.HangarId) {
                        isExists = true;
                    }
                }

                // hangar does not exist in sector list then keep it in available hangar list
                if (isExists === false) {
                    newHangarList.push(hangar);
                }
            });

            // Update the list
            $scope.hangars = newHangarList;
        }
    };

    $scope.remove = function (sector) {

        // Delete sector
        if (sector.SectorId > 0) {
            $scope.delete(sector.SectorId);
        }
        else {
            // Disable sector
            sector.selected = true;

            var newDataList = [];

            $scope.selectedAll = false;

            angular.forEach($scope.sectors, function (selected) {
                if (!selected.selected) {
                    newDataList.push(selected);
                }
            });

            $scope.sectors = newDataList;
        }
    };
   
    $scope.save = function (sector, selectedHangar) {

        // Check to see if this is a new record or an update
        var hangarId = sector.SectorId > 0 ? sector.HangarId : selectedHangar.HangarId;
        var pilotId = $scope.route.PilotId;
        var careerId = $scope.careerId;
        var routeId = $scope.route.RouteId;

        sectorSave = {
            PilotId: pilotId,
            SectorId: sector.SectorId,
            RouteId: sector.RouteId,
            HangarId: hangarId,
            IsActive: sector.IsActiveSector
        };

        SectorSrvc.saveSector(sectorSave)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    MessageService.addMessage('success', 'Sector has been saved.');

                    // Reload information
                    getSectors(pilotId, careerId, routeId);
                }
                else {
                    //
                }
            });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    getHangarsAllowedByCareer($scope.route.PilotId, $scope.careerId);
    getSectors($scope.route.PilotId, $scope.careerId, $scope.route.RouteId);
});
// (End) Modal Controllers