angular.module('app').controller('HubCtrl', function ($document, $uibModal, $scope, HubSrvc, PilotSrvc, RankSrvc, SessionSrvc) {

    $scope.hubs = {};
    $scope.hubRemaining = 0;
    $scope.pilot = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function deleteHub(hubId) {

        HubSrvc.deleteHub($scope.user.PilotId, hubId)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    // Reload information
                    // Reload information
                    init($scope.user.PilotId, $scope.user.RankId);
                }
                else {
                    //
                }
            });
    }

    function disableHub(hubId) {

        HubSrvc.disableRoute($scope.user.PilotId, hubId, $scope.pilot.CurrentGameDateTimeUTC)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    // Reload information
                    init($scope.user.PilotId, $scope.user.RankId);
                }
                else {
                    //
                }
            });
    }

    function insertHub(icao, pilotId, currentGameDateTimeUTC) {

        HubSrvc.insertHub(icao, pilotId, currentGameDateTimeUTC)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    // Reload information
                    init($scope.user.PilotId, $scope.user.RankId);
                }
                else {
                    //
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

                        // Get list of hubs
                        HubSrvc.getHubs(pilotId)
                            .then(function (data) {

                                $scope.hubs = data.Hubs;

                                // Calculate remaing hubs available to open
                                $scope.hubRemaining = $scope.rank.NumHubs - $scope.hubs.length;
                            });
                    });
            });
    }

    $scope.confirmDeleteHubModal = function (size, hub, parentSelector) {

        $scope.input = {
            Hub: hub
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalDeleteHub.html',
            controller: 'ModalDeleteHubCtrl',
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
                deleteHub(hub.HubId);
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.confirmDisableHubModal = function (size, hub, parentSelector) {

        $scope.input = {
            Hub: hub
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalDisableHub.html',
            controller: 'ModalDisableHubCtrl',
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
                disableHub(hub.HubId);
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.createHubModal = function (size, parentSelector) {

        $scope.input = {
            PilotId: $scope.user.PilotId,
            CareerId: $scope.user.CareerId,
            RankId: $scope.user.RankId,
            HubId: 0,
            HubsAllowed: $scope.rank.NumRoutes,
            HubsOwned: $scope.hubs.length,
            DistanceAllowed: $scope.rank.FlightDistance
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalHub.html',
            controller: 'ModalHubCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                input: function () {
                    return $scope.input;
                }
            }
        });

        modalInstance.result.then(function (output) {

            insertHub(output.Icao, $scope.user.PilotId, $scope.pilot.CurrentGameDateTimeUTC);

        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.processDay = function () {

        alert('Process Day');
    };

    init($scope.user.PilotId, $scope.user.RankId);
});

angular.module('app').controller('HubHomeBaseCtrl', function ($document, $uibModal, $scope, HubSrvc, SessionSrvc) {

    $scope.hub = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function getHomeBase(pilotId) {

        HubSrvc.getHomeBase(pilotId)
            .then(function (data) {
                $scope.hub = data.Hub;
            });
    }

    getHomeBase($scope.user.PilotId);
});

// Modal Controllers
angular.module('app').controller('ModalDeleteHubCtrl', function ($scope, $uibModalInstance, input) {

    $scope.hub = input.Hub;

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

angular.module('app').controller('ModalDisableHubCtrl', function ($scope, $uibModalInstance, input) {

    $scope.hub = input.Hub;

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

angular.module('app').controller('ModalHubCtrl', function ($scope, $uibModalInstance, input, AirportSrvc, FormulaSrvc, HubSrvc) {

    $scope.input = input;

    $scope.airportFrom = {};
    $scope.airportTo = {};
    $scope.distanceAllowed = $scope.input.DistanceAllowed;
    $scope.hubs = {};
    $scope.isSaveAllowed = false;
    $scope.route = {};
    $scope.hubEdit = {
        HubId: 0,
        Icao: '',
        IcaoAirportName: '',
        Distance: 0
    };
    $scope.selectedHub = {};

    function calculateDistance() {

        $scope.isSaveAllowed = false;
        var newHubList = [];

        $scope.hubs.forEach(function (hub, ix) {

            // Calcuate the distance
            FormulaSrvc.calculateDistance(hub.Icao, $scope.hubEdit.Icao)
                .then(function (data) {

                    hub.Distance = data.Value.Distance;

                    // Calculate the route fee
                    FormulaSrvc.calculateRouteFee(hub.Distance)
                        .then(function (data) {

                            hub.RouteFee = data.Value.Data.Value;

                            newHubList.push(hub);

                            // If flight distance is too long, then do not allow user to save route
                            if (hub.Distance <= $scope.distanceAllowed) {
                                $scope.isSaveAllowed = true;
                            }
                        });

                    //newHubList.push(hub);

                    //// If flight distance is too long, then do not allow user to save route
                    //if (hub.Distance <= $scope.distanceAllowed) {
                    //    $scope.isSaveAllowed = true;
                    //}
                });
        });

        // Update the list
        $scope.hubs = newHubList;
    }

    function calculateDistance2() {

        $scope.isSaveAllowed = false;
        var newHubList = [];

        $scope.hubs.forEach(function (hub, ix) {

            FormulaSrvc.calculateRouteFee(hub.Distance)
                .then(function (data) {

                    hub.Distance = data.Value.Distance;

                    newHubList.push(hub);

                    // If flight distance is too long, then do not allow user to save route
                    if (hub.Distance <= $scope.distanceAllowed) {
                        $scope.isSaveAllowed = true;
                    }
                });
        });

        // Update the list
        $scope.hubs = newHubList;
    }

    function getHubs(pilotId) {

        HubSrvc.getHubs(pilotId)
            .then(function (data) {
                $scope.hubs = data.Hubs;
            });
    }

    $scope.getAirport = function (icao) {

        $scope.hubEdit.IcaoAirportName = '';
        $scope.isSaveAllowed = false;

        if (icao.length > 0) {

            AirportSrvc.getAirport(icao)
                .then(function (data) {
                    $scope.hubEdit.IcaoAirportName = data.Airport.AirportName;

                    // Calculate the distance betwwen both airports
                    if ($scope.hubEdit.IcaoAirportName.length > 0) {
                        calculateDistance();
                    }
                });
        }
    };

    $scope.hubChange = function () {

        $scope.isSaveAllowed = false;

        // Calculate the distance betwwen both airports
        // Do not allow a route to be created if a hub is set to pending close
        if ($scope.selectedHub.HubId > 0 && $scope.selectedHub.IsPendingClose === false > 0 && $scope.hubEdit.IcaoAirportName.length > 0) {
            calculateDistance($scope.selectedHub.Icao, $scope.hubEdit.Icao);
        }
    };

    $scope.save = function () {

        output = {
            Icao: $scope.hubEdit.Icao
        };

        $uibModalInstance.close(output);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    getHubs($scope.input.PilotId);
});
// (End) Modal Controllers