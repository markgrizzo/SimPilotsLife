angular.module('app').controller('RegisterCtrl', function ($state, $scope, SessionSrvc, UserSrvc) {

    $scope.user = {
        Username: '',
        Password: '',
        RepeatPassword: '',
        FirstName: '',
        LastName: '',
        Email: ''
    };

    $scope.user = {
        Username: 'HappyJoe',
        Password: '123',
        RepeatPassword: '123',
        FirstName: 'Happy',
        LastName: 'Joe',
        Email: 'HappyJoe@email.com'
    };

    // remove sessions
    SessionSrvc.remove("splSession");

    $scope.navigateToLogin = function () {

        $state.go('appSimple.login');
    };

    $scope.register = function () {

        register($scope.user);
    };

    function register(user) {

        UserSrvc.register(user)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    UserSrvc.login($scope.user.Username, $scope.user.Password)
                        .then(function (data) {
                            $state.go('appSimple.registerCareer');
                        });
                }
                else {
                    //
                }
            });
    }
});

angular.module('app').controller('RegisterCareerCtrl', function ($state, $scope, AircraftSrvc, CareerSrvc, CompanySrvc, PilotSrvc, SessionSrvc, UserSrvc) {

    $scope.aircrafts = {};
    $scope.careers = {};
    $scope.companies = {};
    $scope.icaoHomeBase = '';
    $scope.pilot = {
        UserId: 0,
        CareerId: 0,
        CurrentGameDateTimeUTC: new Date(),
        CompanyId: 0,
        HomeBaseIcao: '',
        FirstName: '',
        LastName: '',
        AircraftId: 0,
        AircraftDescription: '',
        BirthDateMonth: 0,
        BirthDateDay: 0,
        Weight: 0
    };
    $scope.session = SessionSrvc.get('splSession');
    $scope.selectedAircraft = {};
    $scope.selectedCareer = {};
    $scope.selectedCompany = {};
    $scope.user = $scope.session.User;

    $scope.careerChange = function () {

        getAircraftsAllowedByCareer($scope.selectedCareer.CareerId);
        getCompanyHiring($scope.user.PilotId, $scope.selectedCareer.CareerId);
    };

    $scope.createPilot = function () {

        var birthDay = new Date();
        var currentGameDateTimeUTC = new Date();

        //currentGameDateTimeUTC = $scope.pilot.currentGameDateTimeUTC;
        //alert('currentGameDateTimeUTC=' + currentGameDateTimeUTC.getMonth() + '/' + currentGameDateTimeUTC.getDate() + '/' + currentGameDateTimeUTC.getFullYear());
        //alert('currentGameDateTimeUTC=' + currentGameDateTimeUTC);

        $scope.pilot.UserId = $scope.user.UserId;
        $scope.pilot.CareerId = $scope.selectedCareer.CareerId;
        //$scope.pilot.currentGameDateTimeUTC = $scope.pilot.CurrentGameDateTimeUTC;
        $scope.pilot.CompanyId = $scope.selectedCompany.CompanyId;
        $scope.pilot.AircraftId = $scope.selectedAircraft.AircraftId;

        PilotSrvc.createNewPilot($scope.pilot)
            .then(function (data) {

                if (parseInt(data.Message.Code) === 0) {

                    $state.go('app.main');
                }
                //else {

                //}                
            });
    };

    function getAircraftsAllowedByCareer (careerId) {

        AircraftSrvc.getAircraftsAllowedByCareer(careerId)
            .then(function (data) {
                $scope.aircrafts = data.Aircrafts;
            });
    }

    function getCareers() {

        CareerSrvc.getCareers()
            .then(function (data) {
                $scope.careers = data.Careers;
            });
    }

    function getCompanyHiring(pilotId, careerId) {

        CompanySrvc.getCompanyHiring(pilotId, careerId)
            .then(function (data) {
                $scope.companies = data.Companies;
            });
    }

    getCareers();
});