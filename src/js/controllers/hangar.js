angular.module('app').controller('HangarCtrl', function ($document, $uibModal, $scope, HangarSrvc, LogbookSrvc, MessageService, SessionSrvc) {

    var $ctrl = this;
    $scope.jsonObj = {};
    $scope.hangarId = '';
    $scope.hangar = {};
    $scope.hangars = {};
    $scope.isEdit = {
        AircraftDescription: false,
        CargoCapacity: false,
        GroundSpeedKts: false,
        NumPilots: false,
        IsFlightAttendantOnBoard: false,
        PassengerCapacity: false,
        PreFlightTimeMin: false
    };
    $scope.logbook = {};
    $scope.orginalValues = {
        AircraftDescription: '',
        CargoCapacity: 0,
        GroundSpeedKts: 0,
        NumPilots: 0,
        IsFlightAttendantOnBoard: false,
        PassengerCapacity: 0,
        PreFlightTimeMin: 0
    };
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    $scope.items = ['item1', 'item2', 'item3'];

    function activateHangar(hangarId) {

        HangarSrvc.activateHangar($scope.user.PilotId, hangarId)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {
                    MessageService.addMessage('success', 'Aircraft has been activated.');

                    // Reload information
                    int();
                }
                else {
                    //
                }
            });
    }

    function deleteHangar(hangarId) {

        HangarSrvc.deleteHangar($scope.user.PilotId, hangarId)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {
                    MessageService.addMessage('success', 'Aircraft has been deleted.');

                    // Reload information
                    int();
                }
                else {
                    //
                }
            });
    }

    function disableHangar(hangarId) {

        HangarSrvc.disableHangar($scope.user.PilotId, hangarId)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {
                    MessageService.addMessage('success', 'Aircraft has been disabled.');

                    // Reload information
                    int();
                }
                else {
                    //
                }
            });
    }

    function getHangar(hangarId) {

        HangarSrvc.getHangar(hangarId)
            .then(function (data) {
                $scope.hangar = data.Hangar;

                setOriginalValues(data.Hangar);
                getLogbookAircraftFamilyStats($scope.user.PilotId, $scope.hangar.AircraftFamilyId);
            });
    }

    function getHangars(pilotId) {
        HangarSrvc.getHangars(pilotId)
            .then(function (data) {

                $scope.hangars = data.Hangars;
            });
    }

    function getLogbookAircraftFamilyStats(pilotId, aircraftFamilyId) {

        LogbookSrvc.getLogbookAircraftFamilyStats(pilotId, aircraftFamilyId)
            .then(function (data) {
                $scope.logbook = data.Logbook;
            });
    }

    function getWeather() {
        HangarSrvc.getWeather()
            .then(function (data) {

                $scope.jsonObj = data[0];
            });
    }

    function setOriginalValues(data) {

        $scope.orginalValues = {
            AircraftDescription: data.AircraftDescription,
            CargoCapacity: data.CargoCapacity,
            GroundSpeedKts: data.GroundSpeedKts,
            NumPilots: data.NumPilots,
            IsFlightAttendantOnBoard: data.IsFlightAttendantOnBoard,
            PassengerCapacity: data.PassengerCapacity,
            PreFlightTimeMin: data.PreFlightTimeMin
        };
    }

    function updateSingle(data) {

        HangarSrvc.updateSingle(data)
            .then(function (data) {

                getHangar($scope.user.HangarId);
                getHangars($scope.user.PilotId);
            });
    }

    function updatePreFlightTimeMin(field, hangarId, value) {

        HangarSrvc.updatePreFlightTimeMin(field, hangarId, value)
            .then(function (data) {

            });
    }

    function int() {
        getHangar($scope.user.HangarId);
        getHangars($scope.user.PilotId);
    }

    $scope.addHangarModal = function (size, parentSelector) {

        $scope.input = {
            PilotId: $scope.user.PilotId,
            CareerId: $scope.user.CareerId
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalAddHangar.html',
            controller: 'AddHangarCtrl',
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
            getHangars($scope.user.PilotId);
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.animationsEnabled = true;

    $scope.cancel = function (field) {

        switch (field) {
            case 'AircraftDescription':
                $scope.isEdit.AircraftDescription = false;
                $scope.hangar.AircraftDescription = $scope.orginalValues.AircraftDescription;

                break;
            case 'CargoCapacity':
                $scope.isEdit.CargoCapacity = false;
                $scope.hangar.CargoCapacity = $scope.orginalValues.CargoCapacity;

                break;
            case 'GroundSpeedKts':
                $scope.isEdit.GroundSpeedKts = false;
                $scope.hangar.GroundSpeedKts = $scope.orginalValues.GroundSpeedKts;

                break;
            case 'NumPilots':
                $scope.isEdit.NumPilots = false;
                $scope.hangar.NumPilots = $scope.orginalValues.NumPilots;

                break;
            case 'IsFlightAttendantOnBoard':
                $scope.isEdit.IsFlightAttendantOnBoard = false;
                $scope.hangar.IsFlightAttendantOnBoard = $scope.orginalValues.IsFlightAttendantOnBoard;

                break;
            case 'PassengerCapacity':
                $scope.isEdit.PassengerCapacity = false;
                $scope.hangar.PassengerCapacity = $scope.orginalValues.PassengerCapacity;

                break;
            case 'PreFlightTimeMin':
                $scope.isEdit.PreFlightTimeMin = false;
                $scope.hangar.PreFlightTimeMin = $scope.orginalValues.PreFlightTimeMin;

                break;
            default:
        }
    };

    $scope.confirmActivateHangarModal = function (size, hangar, parentSelector) {

        $scope.input = {
            Hangar: hangar
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalActivateHangar.html',
            controller: 'ModalActivateHangarCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                input: function () {
                    return $scope.input;
                }
            }
        });

        modalInstance.result.then(function (output) {

            if (output.IsActivate === true) {
                activateHangar(hangar.HangarId);
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.confirmDeleteHangarModal = function (size, hangar, parentSelector) {

        $scope.input = {
            Hangar: hangar
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalDeleteHangar.html',
            controller: 'ModalDeleteHangarCtrl',
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
                deleteHangar(hangar.HangarId);
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.confirmDisableHangarModal = function (size, hangar, parentSelector) {

        $scope.input = {
            Hangar: hangar
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalDisableHangar.html',
            controller: 'ModalDisableHangarCtrl',
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
                disableHangar(hangar.HangarId);
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.edit = function (field) {

        switch (field) {
            case 'AircraftDescription': $scope.isEdit.AircraftDescription = true; break;
            case 'CargoCapacity': $scope.isEdit.CargoCapacity = true; break;
            case 'GroundSpeedKts': $scope.isEdit.GroundSpeedKts = true; break;
            case 'NumPilots': $scope.isEdit.NumPilots = true; break;
            case 'IsFlightAttendantOnBoard': $scope.isEdit.IsFlightAttendantOnBoard = true; break;
            case 'PassengerCapacity': $scope.isEdit.PassengerCapacity = true; break;
            case 'PreFlightTimeMin': $scope.isEdit.PreFlightTimeMin = true; break;
            default:
        }
    };

    $scope.editGatesModal = function (size, hangar, parentSelector) {

        $scope.input = {
            Hangar: hangar
        };

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalGate.html',
            controller: 'ModalEditGatesCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                input: function () {
                    return $scope.input;
                }
            }
        });

        modalInstance.result.then(function (output) {

            if (output.IsActivate === true) {
                activateHangar(hangar.HangarId);
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.update = function (field, value) {

        var data = {};

        switch (field) {
            case 'AircraftDescription':
                $scope.isEdit.AircraftDescription = false;
                data = { FieldToUpdate: field, Hangar: hangar = { HangarId: $scope.hangar.HangarId, AircraftDescription: value } };

                break;
            case 'CargoCapacity':
                $scope.isEdit.CargoCapacity = false;
                data = { FieldToUpdate: field, Hangar: hangar = { HangarId: $scope.hangar.HangarId, CargoCapacity: value } };

                break;
            case 'GroundSpeedKts':
                $scope.isEdit.GroundSpeedKts = false;
                data = { FieldToUpdate: field, Hangar: hangar = { HangarId: $scope.hangar.HangarId, GroundSpeedKts: value } };

                break;
            case 'NumPilots':
                $scope.isEdit.NumPilots = false;
                data = { FieldToUpdate: field, Hangar: hangar = { HangarId: $scope.hangar.HangarId, NumPilots: value } };

                break;
            case 'IsFlightAttendantOnBoard':
                $scope.isEdit.IsFlightAttendantOnBoard = false;
                data = { FieldToUpdate: field, Hangar: hangar = { HangarId: $scope.hangar.HangarId, IsFlightAttendantOnBoard: value } };

                break;
            case 'PassengerCapacity':
                $scope.isEdit.PassengerCapacity = false;
                data = { FieldToUpdate: field, Hangar: hangar = { HangarId: $scope.hangar.HangarId, PassengerCapacity: value } };

                break;
            case 'PreFlightTimeMin':
                $scope.isEdit.PreFlightTimeMin = false;
                data = { FieldToUpdate: field, Hangar: hangar = { HangarId: $scope.hangar.HangarId, PreFlightTimeMin: value } };

                break;
            default:
        }

        updateSingle(data);
    };

    $scope.viewHangar = function (hangarId) {

        getHangar(hangarId);
    };

    $scope.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            //controllerAs: '$scope',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.openComponentModal = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            component: 'modalComponent',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('modal-component dismissed at: ' + new Date());
        });
    };

    $scope.openMultipleModals = function () {
        $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title-bottom',
            ariaDescribedBy: 'modal-body-bottom',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: function ($scope) {
                $scope.name = 'bottom';
            }
        });

        $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: function ($scope) {
                $scope.name = 'top';
            }
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.showForm = function () {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);

        var modalInstance = $uibModal.open({
            templateUrl: 'modal-form.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    int();
});

// Modal Controllers
angular.module('app').controller('AddHangarCtrl', function ($scope, $uibModalInstance, input, AircraftSrvc, HangarSrvc, MessageService, PilotTypeRatingSrvc, ProfileSrvc) {

    $scope.input = input;

    $scope.aircraftDescription = '';
    $scope.aircrafts = {};
    $scope.hangars = {};
    $scope.pilotTypeRatings = {};
    $scope.profile = {};
    $scope.selectedAircraft = {};
    $scope.selectedHangarAircraft = {};

    function getAircraftsAllowedByCareer(careerId) {

        AircraftSrvc.getAircraftsAllowedByCareer(careerId)
            .then(function (data) {
                $scope.aircrafts = data.Aircrafts;
            });
    }

    function getHangars(pilotId) {

        HangarSrvc.getHangars(pilotId)
            .then(function (data) {
                $scope.hangars = data.Hangars;
            });
    }

    function getPilotTypeRatings(pilotId) {

        PilotTypeRatingSrvc.getPilotTypeRatings(pilotId)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    $scope.pilotTypeRatings = data.PilotTypeRatings;
                }
                else {
                    //
                }
            });
    }

    function getProfile(pilotId) {

        ProfileSrvc.getProfile(pilotId)
            .then(function (data) {
                $scope.profile = data.Profile;
            });
    }

    function insertPilotHangar(pilot) {

        HangarSrvc.insertPilotHangar(pilot)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    MessageService.addMessage('success', 'Aircraft has been added.');
                    init();
                }
                else {
                    MessageService.addMessage('warning', data.Message.ApplicationMessage);
                }
            });
    }

    function init() {
        getProfile($scope.input.PilotId);
        getPilotTypeRatings($scope.input.PilotId);
        getAircraftsAllowedByCareer($scope.input.CareerId);
        getHangars($scope.input.PilotId);

        $scope.aircraftDescription = '';
    }

    $scope.add = function () {

        var pilot = {
            PilotId: $scope.input.PilotId,
            CurrentGameDateTimeUTC: $scope.profile.CurrentGameDateTimeUTC,
            AircraftId: $scope.selectedAircraft.AircraftId,
            AircraftDescription: $scope.aircraftDescription
        };

        insertPilotHangar(pilot);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    init();
});

angular.module('app').controller('ModalActivateHangarCtrl', function ($scope, $uibModalInstance, input) {

    $scope.hangar = input.Hangar;

    $scope.activate = function () {

        output = {
            IsActivate: true
        };

        $uibModalInstance.close(output);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('app').controller('ModalDeleteHangarCtrl', function ($scope, $uibModalInstance, input) {

    $scope.hangar = input.Hangar;

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

angular.module('app').controller('ModalDisableHangarCtrl', function ($scope, $uibModalInstance, input) {

    $scope.hangar = input.Hangar;

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

angular.module('app').controller('ModalEditGatesCtrl', function ($scope, $uibModalInstance, input, MessageService, GateSrvc) {

    $scope.hangar = input.Hangar;
    $scope.gates = {};

    function getGates(pilotId, hangarId) {

        GateSrvc.getGates(pilotId, hangarId)
            .then(function (data) {
                $scope.gates = data.Gates;
            });
    }

    $scope.delete = function (gateId) {

        var pilotId = $scope.hangar.PilotId;
        var hangarId = $scope.hangar.HangarId;

        GateSrvc.deleteGate(pilotId, gateId)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    MessageService.addMessage('success', 'Gate has been deleted.');

                    // Reload information
                    getGates(pilotId, hangarId);
                }
                else {
                    //
                }
            });
    };

    $scope.save = function (gate) {

        // Check to see if this is a new record or an update
        var gateId = gate.GateId > 0 ? gate.GateId : 0;
        var hangarId = $scope.hangar.HangarId;
        var pilotId = $scope.hangar.PilotId;

        gateSave = {
            GateId: gateId,
            HangarId: hangarId,
            Icao: gate.Icao,
            Gate: gate.Gate
        };

        GateSrvc.saveGate(gateSave)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    MessageService.addMessage('success', 'Gate has been saved.');

                    // Reload information
                    getGates(pilotId, hangarId);
                }
                else {
                    //
                }
            });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    getGates($scope.hangar.PilotId, $scope.hangar.HangarId);
});
// (End) Modal Controllers





// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
angular.module('app').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
    var $ctrl = this;

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.
angular.module('app').component('modalComponent', {
    templateUrl: 'myModalContent.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function ($scope) {
        //var $ctrl = this;

        $scope.$onInit = function () {
            $scope.items = $scope.resolve.items;
            $scope.selected = {
                item: $scope.items[0]
            };
        };

        $scope.ok = function () {
            $scope.close({ $value: $scope.selected.item });
        };

        $scope.cancel = function () {
            $scope.dismiss({ $value: 'cancel' });
        };
    }
});