angular.module('app').controller('TransactionCtrl', function ($document, $uibModal, $scope, ProfileSrvc, SessionSrvc, TransactionSrvc) {

    $scope.profile = {};
    $scope.transaction = {};
    $scope.transactionsMonthly = {};
    $scope.transactionsYearly = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function getProfile(pilotId) {

        ProfileSrvc.getProfile(pilotId)
            .then(function (data) {
                $scope.profile = data.Profile;
            });
    }

    function getTransactionYearlyAmountSum(pilotId) {

        TransactionSrvc.getTransactionYearlyAmountSum(pilotId)
            .then(function (data) {
                $scope.transactionsYearly = data.Transactions;
            });
    }

    function getTransactionYearlyAmountSumByMonth(pilotId) {

        TransactionSrvc.getTransactionYearlyAmountSumByMonth(pilotId)
            .then(function (data) {
                $scope.transactionsMonthly = data.Transactions;
            });
    }

    getProfile($scope.user.PilotId);
    getTransactionYearlyAmountSum($scope.user.PilotId);
    getTransactionYearlyAmountSumByMonth($scope.user.PilotId);
});

angular.module('app').controller('TransactionYearlyAmountCtrl', function ($document, $uibModal, $scope, SessionSrvc, TransactionSrvc) {

    $scope.transactions = {};
    $scope.transactionsMonthly = {};
    $scope.session = SessionSrvc.get('splSession');
    $scope.user = $scope.session.User;

    function getTransactionYearlyAmountSum(pilotId) {

        TransactionSrvc.getTransactionYearlyAmountSum(pilotId)
            .then(function (data) {
                $scope.transactions = data.Transactions;
            });
    }

    function getTransactionYearlyAmountSumByMonth(pilotId) {

        TransactionSrvc.getTransactionYearlyAmountSumByMonth(pilotId)
            .then(function (data) {
                $scope.transactionsMonthly = data.Transactions;
            });
    }

    getTransactionYearlyAmountSum($scope.user.PilotId);
    getTransactionYearlyAmountSumByMonth($scope.user.PilotId);
});

angular.module('app').controller('TransactionMonthChartCtrl', function ($scope, SessionSrvc, TransactionSrvc) {

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var elements = 24;
    var data1 = [];
    var data2 = [];
    var data3 = [];
    $scope.session = SessionSrvc.get('splSession');
    $scope.transactionsMonthly = {};
    $scope.user = $scope.session.User;

    //for (var i = 0; i <= elements; i++) {
    //    data1.push(random(40, 100));
    //    data2.push(random(40, 100));
    //    data3.push(50);
    //}

    function getTransactionYearlyAmountSumByMonth(pilotId) {

        TransactionSrvc.getTransactionYearlyAmountSumByMonth(pilotId)
            .then(function (data) {
                $scope.transactionsMonthly = data.Transactions;

                ////for (var i = 0; i <= elements; i++) {
                ////    data1.push($scope.transactionsMonthly[i].Salary);
                ////    data2.push($scope.transactionsMonthly[i].LifeStyleAmount);
                ////    data3.push($scope.transactionsMonthly[i].RouteFee);

                ////    $scope.labels.push($scope.transactionsMonthly[i].TransactionMonth + '/' + $scope.transactionsMonthly[i].TransactionYear);
                ////}

                // Check to see if there are at least 12 months worth of data
                if ($scope.transactionsMonthly.length < 24)
                    elements = $scope.transactionsMonthly.length;

                for (var i = elements - 1; i >= 0; i--) {
                    data1.push($scope.transactionsMonthly[i].Salary);

                    $scope.labels.push($scope.transactionsMonthly[i].TransactionMonth + '/' + $scope.transactionsMonthly[i].TransactionYear);
                }
            });
    }

    //$scope.labels = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6', '7', '8'];
    //$scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.labels = [];
    //$scope.series = ['Salary', 'On Time %', 'Base Line'];
    $scope.series = ['Salary'];
    //$scope.data = [data1, data2, data3];
    $scope.data = [data1];
    $scope.colors = [{
        backgroundColor: convertHex(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff'

    }, {
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: '#fff'
    }, {
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 1,
        borderDash: [8, 5]
    }];
    $scope.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                },
                ticks: {
                    callback: function (value) {
                        //return value.charAt(0);
                        return value;
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 100,
                    stepSize: 500,
                    //max: 100
                }
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3
            }
        }
    };

    getTransactionYearlyAmountSumByMonth($scope.user.PilotId);

});