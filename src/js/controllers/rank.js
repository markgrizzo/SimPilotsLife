angular.module('app').controller('RankCtrl', function ($document, $uibModal, $scope, RankSrvc, SessionSrvc) {

    $scope.rank = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function getRank(rankId) {

        RankSrvc.getRank(rankId)
            .then(function (data) {
                $scope.rank = data.Rank;
            });
    }

    getRank($scope.user.RankId);

});

angular.module('app').controller('CurrentCareerRankCntrl', function ($scope, RankSrvc, SessionSrvc) {

    $scope.ranks = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function getCareerRanks(careerId) {

        RankSrvc.getCareerRanks(careerId)
            .then(function (data) {
                $scope.ranks = data.Ranks;
            });
    }

    getCareerRanks($scope.user.CareerId);

});