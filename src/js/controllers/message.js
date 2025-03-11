angular.module('app').controller('MessageCtrl', function ($scope, MessageService) {

    $scope.alerts = MessageService.getMessages();

    $scope.closeAlert = function (alertIndex) {
        MessageService.removeMessage(alertIndex);
    };
});