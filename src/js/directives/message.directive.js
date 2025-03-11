angular.module('app').directive('messageDirective', function () {

    return {
        restrict: 'EA',
        templateUrl: '../views/common/message.html',
        scope: {
            // we don't need anything from other scopes. So create an empty isolate scope.
        },
        controller: ['$scope', 'MessageService', function ($scope, MessageService) {

            $scope.alerts = MessageService.getMessages();

            $scope.closeAlert = function (alertIndex) {
                MessageService.removeMessage(alertIndex);
            };
        }]
    };
});

angular.module('app').directive('messageModalDirective', function () {

    return {
        restrict: 'EA',
        templateUrl: '../views/common/messageModal.html',
        scope: {
            // we don't need anything from other scopes. So create an empty isolate scope.
        },
        controller: ['$scope', 'MessageService', function ($scope, MessageService) {

            $scope.alertsModal = MessageService.getMessages();

            $scope.closeAlertModal = function (alertIndex) {
                MessageService.removeMessage(alertIndex);
            };
        }]
    };
});