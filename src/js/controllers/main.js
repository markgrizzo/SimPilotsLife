angular.module('app').controller('MainCtrl', function ($scope, LifestyleSrvc, PilotSrvc, ProfileSrvc, SessionSrvc) {

    $scope.session = SessionSrvc.get('splSession');
    
    $scope.companyImage = '';
    $scope.day = new Date();
    $scope.epauletImage = "";
    $scope.isEdit = {
        LifestyleMonthlyAmount: false
    };
    $scope.isShowEditLifestyleMonthlyAmount = false;
    $scope.lifestyleAmounts = {};
    $scope.orginalValues = {
        LifestyleMonthlyAmount: 0
    };
    $scope.profile = {};
    $scope.selectedLifestyle = {};
    $scope.user = $scope.session.User;

    function getLifestyleMonthlyAmounts() {

        LifestyleSrvc.getLifestyleMonthlyAmounts()
            .then(function (data) {
                $scope.lifestyles = data.Lifestyles;

                $scope.lifestyles.selectedLifestyle = { MonthlyAmount: $scope.profile.LifestyleMonthlyAmount };
                $scope.orginalValues.LifestyleMonthlyAmount = $scope.profile.LifestyleMonthlyAmount;
            });
    }

    function getProfile(pilotId) {

        ProfileSrvc.getProfile(pilotId)
            .then(function (data) {
                $scope.profile = data.Profile;

                // Determine if user can edit lifestyle monthly amount
                $scope.day = new Date($scope.profile.CurrentGameDateTimeUTC);
                // Set epaulet
                $scope.epauletImage = '../img/epaulets/RankEpaulet_' + $scope.profile.CareerId + '_' + $scope.profile.RankOrder + '.png';
                // Set company logo
                $scope.companyImage = 'img/companies/company_' + $scope.profile.CompanyId + '.png';

                if ($scope.day.getDate() === 1) {
                    $scope.isShowEditLifestyleMonthlyAmount = true;
                }
                else {
                    $scope.isShowEditLifestyleMonthlyAmount = false;
                }

                getLifestyleMonthlyAmounts();
            });
    }

    function updateSingle(data) {

        PilotSrvc.updateSingle(data)
            .then(function (data) {

                getProfile($scope.user.PilotId);
            });
    }

    $scope.cancel = function (field) {

        switch (field) {
            case 'LifestyleMonthlyAmount':
                $scope.isEdit.LifestyleMonthlyAmount = false;
                $scope.lifestyles.selectedLifestyle = { MonthlyAmount: $scope.orginalValues.LifestyleMonthlyAmount };

                break;
            default:
        }
    };

    $scope.edit = function (field) {

        switch (field) {
            case 'LifestyleMonthlyAmount': $scope.isEdit.LifestyleMonthlyAmount = true; break;
            default:
        }
    };

    $scope.update = function (field, value) {

        var data = {};

        switch (field) {
            case 'LifestyleMonthlyAmount':
                $scope.isEdit.LifestyleMonthlyAmount = false;
                data = { FieldToUpdate: field, Pilot: pilot = { PilotId: $scope.user.PilotId, LifestyleMonthlyAmount: value } };

                break;
            default:
        }

        updateSingle(data);
    };

    getProfile($scope.user.PilotId);
});

angular.module('app').controller('trafficDemoCtrl', function ($scope) {

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var elements = 31;
    var data1 = [];
    var data2 = [];
    var data3 = [];

    for (var i = 0; i <= elements; i++) {
        data1.push(random(40, 100));
        data2.push(random(40, 100));
        data3.push(50);
    }

    $scope.labels = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6', '7', '8'];
    //$scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.series = ['Rating', 'On Time %', 'Base Line'];
    $scope.data = [data1, data2, data3];
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
                    drawOnChartArea: false,
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
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(100 / 5),
                    max: 100
                }
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    }

});

angular.module('app').controller('cardChartCtrl1', function ($scope) {

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    $scope.data = [
        [65, 59, 84, 84, 51, 55, 40]
    ];
    $scope.colors = [{
        backgroundColor: brandPrimary,
        borderColor: 'rgba(255,255,255,.55)',
    }];
    $scope.options = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, $scope.data[0]) - 5,
                    max: Math.max.apply(Math, $scope.data[0]) + 5,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
    }

});

angular.module('app').controller('cardChartCtrl2', function ($scope) {

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    $scope.data = [
        [1, 18, 9, 17, 34, 22, 11]
    ];
    $scope.colors = [{
        backgroundColor: brandInfo,
        borderColor: 'rgba(255,255,255,.55)',
    }];
    $scope.options = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, $scope.data[0]) - 5,
                    max: Math.max.apply(Math, $scope.data[0]) + 5
                }
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },

        },
    }

});

angular.module('app').controller('cardChartCtrl3', function ($scope) {

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    $scope.data = [
        [78, 81, 80, 45, 34, 12, 40]
    ];
    $scope.data4 = [
        [35, 23, 56, 22, 97, 23, 64]
    ];
    $scope.colors = [{
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
    }];
    $scope.options = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
    }

});

angular.module('app').controller('cardChartCtrl4', function ($scope) {

    var elements = 16;
    var labels = [];
    var data = [];
    //
    for (var i = 2000; i <= 2000 + elements; i++) {
        labels.push(i);
        data.push(random(40, 100));
    }

    $scope.labels = labels;

    $scope.data = [data];

    $scope.colors = [{
        backgroundColor: 'rgba(255,255,255,.3)',
        borderWidth: 0
    }];
    $scope.options = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display: false
            }]
        },
    }

});

angular.module('app').controller('dateRangeCtrl', function ($scope) {

    $scope.date = {
        startDate: moment().subtract(5, 'days'),
        endDate: moment()
    };
    $scope.opts = {
        drops: 'down',
        opens: 'left',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 days': [moment().subtract(7, 'days'), moment()],
            'Last 30 days': [moment().subtract(30, 'days'), moment()],
            'This month': [moment().startOf('month'), moment().endOf('month')]
        }
    };

    //Watch for date changes
    $scope.$watch('date', function (newDate) {
        //console.log('New date set: ', newDate);
    }, false);

    function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
    }

});

angular.module('app').controller('socialBoxCtrl', function ($scope) {

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    $scope.data1 = [
        [65, 59, 84, 84, 51, 55, 40]
    ];
    $scope.data2 = [
        [1, 13, 9, 17, 34, 41, 38]
    ];
    $scope.data3 = [
        [78, 81, 80, 45, 34, 12, 40]
    ];
    $scope.data4 = [
        [35, 23, 56, 22, 97, 23, 64]
    ];
    $scope.colors = [{
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff'
    }];
    $scope.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                display: false,
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    }

});

angular.module('app').controller('sparklineChartCtrl', function ($scope) {

    $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.data1 = [
        [65, 59, 84, 84, 51, 55, 40]
    ];
    $scope.data2 = [
        [1, 13, 9, 17, 34, 41, 38]
    ];
    $scope.data3 = [
        [78, 81, 80, 45, 34, 12, 40]
    ];
    $scope.data4 = [
        [35, 23, 56, 22, 97, 23, 64]
    ];
    $scope.default = [{
        backgroundColor: 'transparent',
        borderColor: '#d1d4d7',
    }];
    $scope.primary = [{
        backgroundColor: 'transparent',
        borderColor: brandPrimary,
    }];
    $scope.info = [{
        backgroundColor: 'transparent',
        borderColor: brandInfo,
    }];
    $scope.danger = [{
        backgroundColor: 'transparent',
        borderColor: brandDanger,
    }];
    $scope.warning = [{
        backgroundColor: 'transparent',
        borderColor: brandWarning,
    }];
    $scope.success = [{
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
    }];
    $scope.options = {
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                display: false,
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    }

});

angular.module('app').controller('horizontalBarsCtrl', function ($scope) {

    $scope.data = [
        {
            day: 'Monday', new: 34, recurring: 78
        },
        {
            day: 'Tuesday', new: 56, recurring: 94
        },
        {
            day: 'Wednesday', new: 12, recurring: 67
        },
        {
            day: 'Thursday', new: 43, recurring: 91
        },
        {
            day: 'Friday', new: 22, recurring: 73
        },
        {
            day: 'Saturday', new: 53, recurring: 82
        },
        {
            day: 'Sunday', new: 9, recurring: 69
        }
    ];

});

angular.module('app').controller('horizontalBarsType2Ctrl', function ($scope) {

    $scope.gender = [
        {
            title: 'Male',
            icon: 'icon-user',
            value: 43
        },
        {
            title: 'Female',
            icon: 'icon-user-female',
            value: 37
        },
    ];

    $scope.source = [
        {
            title: 'Organic Search',
            icon: 'icon-globe',
            value: 191235,
            percent: 56
        },
        {
            title: 'Facebook',
            icon: 'icon-social-facebook',
            value: 51223,
            percent: 15
        },
        {
            title: 'Twitter',
            icon: 'icon-social-twitter',
            value: 37564,
            percent: 11
        },
        {
            title: 'LinkedIn',
            icon: 'icon-social-linkedin',
            value: 27319,
            percent: 8
        }
    ];

});

angular.module('app').controller('usersTableCtrl', function ($scope) {

    $scope.users = [
        {
            avatar: '1.jpg',
            status: 'active',
            name: 'Yiorgos Avraamu',
            new: true,
            registered: 'Jan 1, 2015',
            country: 'USA',
            flag: 'USA.png',
            usage: '50',
            period: 'Jun 11, 2015 - Jul 10, 2015',
            payment: 'mastercard',
            activity: '10 sec ago',
            satisfaction: '48'
        },
        {
            avatar: '2.jpg',
            status: 'busy',
            name: 'Avram Tarasios',
            new: false,
            registered: 'Jan 1, 2015',
            country: 'Brazil',
            flag: 'Brazil.png',
            usage: '10',
            period: 'Jun 11, 2015 - Jul 10, 2015',
            payment: 'visa',
            activity: '5 minutes ago',
            satisfaction: '61'
        },
        {
            avatar: '3.jpg',
            status: 'away',
            name: 'Quintin Ed',
            new: true,
            registered: 'Jan 1, 2015',
            country: 'India',
            flag: 'India.png',
            usage: '74',
            period: 'Jun 11, 2015 - Jul 10, 2015',
            payment: 'stripe',
            activity: '1 hour ago',
            satisfaction: '33'
        },
        {
            avatar: '4.jpg',
            status: 'offline',
            name: 'Enéas Kwadwo',
            new: true,
            registered: 'Jan 1, 2015',
            country: 'France',
            flag: 'France.png',
            usage: '98',
            period: 'Jun 11, 2015 - Jul 10, 2015',
            payment: 'paypal',
            activity: 'Last month',
            satisfaction: '23'
        },
        {
            avatar: '5.jpg',
            status: 'active',
            name: 'Agapetus Tadeáš',
            new: true,
            registered: 'Jan 1, 2015',
            country: 'Spain',
            flag: 'Spain.png',
            usage: '22',
            period: 'Jun 11, 2015 - Jul 10, 2015',
            payment: 'google',
            activity: 'Last week',
            satisfaction: '78'
        },
        {
            avatar: '6.jpg',
            status: 'busy',
            name: 'Friderik Dávid',
            new: true,
            registered: 'Jan 1, 2015',
            country: 'Poland',
            flag: 'Poland.png',
            usage: '43',
            period: 'Jun 11, 2015 - Jul 10, 2015',
            payment: 'amex',
            activity: 'Yesterday',
            satisfaction: '11'
        }
    ]

});

angular.module('app').controller('clientsTableCtrl', function ($scope) {

    $scope.users = [
        {
            avatar: '1.jpg',
            status: 'active',
            name: 'Yiorgos Avraamu',
            registered: 'Jan 1, 2015',
            activity: '10 sec ago',
            transactions: 189,
            comments: 72
        },
        {
            avatar: '2.jpg',
            status: 'busy',
            name: 'Avram Tarasios',
            registered: 'Jan 1, 2015',
            activity: '5 minutes ago',
            transactions: 156,
            comments: 76
        },
        {
            avatar: '3.jpg',
            status: 'away',
            name: 'Quintin Ed',
            registered: 'Jan 1, 2015',
            activity: '1 hour ago',
            transactions: 189,
            comments: 72
        },
        {
            avatar: '4.jpg',
            status: 'offline',
            name: 'Enéas Kwadwo',
            registered: 'Jan 1, 2015',
            activity: 'Last month',
            transactions: 189,
            comments: 72
        },
        {
            avatar: '5.jpg',
            status: 'active',
            name: 'Agapetus Tadeáš',
            registered: 'Jan 1, 2015',
            activity: 'Last week',
            transactions: 189,
            comments: 72
        },
        {
            avatar: '6.jpg',
            status: 'busy',
            name: 'Friderik Dávid',
            registered: 'Jan 1, 2015',
            activity: 'Yesterday',
            transactions: 189,
            comments: 72
        }
    ]

});

angular.module('app').controller('barChartCtrl', function ($scope) {

    var elements = 16;
    var labels = [];
    var data = [];
    var data1 = [];
    var data2 = [];

    for (var i = 0; i <= elements; i++) {
        labels.push('1');
        data.push(random(40, 100));
        data1.push(random(20, 100));
        data2.push(random(60, 100));
    }

    $scope.labels = labels;

    $scope.data = [data];
    $scope.data1 = [data1];
    $scope.data2 = [data2];

    $scope.options = {
        showScale: false,
        scaleFontSize: 0,
        scaleShowGridLines: false,
        barStrokeWidth: 0,
        barBackground: 'rgba(221, 224, 229, 1)',

        // pointDot :false,
        // scaleLineColor: 'transparent',
    };

    $scope.colors = [{
        backgroundColor: brandInfo,
        borderColor: 'rgba(0,0,0,1)',
        highlightFill: '#818a91',
        pointborderColor: '#000'
    }];

});

//convert Hex to RGBA
function convertHex(hex,opacity){
  hex = hex.replace('#','');
  r = parseInt(hex.substring(0,2), 16);
  g = parseInt(hex.substring(2,4), 16);
  b = parseInt(hex.substring(4,6), 16);

  result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
  return result;
}

function random(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}