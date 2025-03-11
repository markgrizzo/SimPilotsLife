angular.module('app').controller('PilotTypeRatingCtrl', function ($scope, PilotTypeRatingSrvc, SessionSrvc) {

    $scope.pilotTypeRatings = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

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


    function init(pilotId) {

        getPilotTypeRatings(pilotId);
    }

    init($scope.user.PilotId);
});