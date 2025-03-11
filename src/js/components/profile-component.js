angular.
    module('app').
    component('profileCtrl', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
        templateUrl: '../../views/components/profile.html',
        bindings: {
            career: '<'  
        },
        controller: function () {

            var $ctrl = this;

            $ctrl.$onInit = function () {
                console.log('*********************** = ' + $ctrl.career);
            }

        }

        //controller: ['$scope, ProfileSrvc, SessionSrvc', function ($scope, ProfileSrvc, SessionSrvc) {


        //controller: function ProfileCtrl($scope, ProfileSrvc, SessionSrvc) {

        //    var $ctrl = this;

        //    $scope.user = $scope.session.User;
        //    $scope.companyImage = '../../img/companies/company_' + $scope.user.CompanyId + '.png';
        //    $scope.epauletImage = "";
        //    $scope.profile = {};
        //    $scope.session = SessionSrvc.get('splSession');


        //    $ctrl.getProfile = function () {
        //        ProfileSrvc.getProfile($scope.user.PilotId)
        //            .then(function (data) {
        //                $scope.profile = data.Profile;

        //                // Set epaulet
        //                $scope.epauletImage = '../img/epaulets/RankEpaulet_' + $scope.profile.CareerId + '_' + $scope.profile.RankOrder + '.png';
        //            });
        //    }
        //    //vm.getProfile($scope.user.PilotId);

        //}
    });