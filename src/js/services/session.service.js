//session.js
angular
    .module('app')
    .service('SessionSrvc', SessionSrvc);

SessionSrvc.$inject = ['$rootScope'];
function SessionSrvc($rootScope) {

    // declarations
    let sessionKey = 'splSession';

    var user = {
        UserId: 0,
        CareerId: 0,
        HangarId: 0,
        RankId: 0,
        CompanyId: 0,
        AircraftFamilyId: 0,
        Username: '',
        SecurityRoleDescription: '',
        FirstName: '',
        LastName: '',
        PilotId: 0
    };

    var token = '';

    var securityFunctions = [];

    this.session = {
        User: user,
        Token: token,
        SecurityFunctions: securityFunctions
    };

    this.setThis = function setThis(obj) {

        this.session.User = obj.User;
        this.session.Token = obj.Token;
        this.session.SecurityFunctions = obj.SecurityFunctions;

        return this.session;
    };

    this.create = function (obj) {

        if (obj) {
            let objectSession = {
                User: {
                    UserId: obj.User.UserId,
                    CareerId: obj.User.CareerId,
                    HangarId: obj.User.HangarId,
                    RankId: obj.User.RankId,
                    CompanyId: obj.User.CompanyId,
                    AircraftFamilyId: obj.User.AircraftFamilyId,
                    Username: obj.User.Username,
                    FirstName: obj.User.FirstName,
                    LastName: obj.User.LastName,
                    PilotId: obj.User.PilotId
                },
                Token: obj.Token,
                //SecurityFunctions: obj.SecurityFunctions
            };

            // Reset User information.
            $rootScope.User = objectSession.User;

            let stringSession = JSON.stringify(this.setThis(objectSession));

            //window.sessionStorage.setItem(sessionKey, stringSession);
            window.localStorage.setItem(sessionKey, stringSession);
        }
        else {
            console.error('No session was created. Trying to create a session without a user and token object.');
        }
    };

    // Seek session object in localStorage
    //let strSession = window.sessionStorage.getItem(sessionKey);
    let strSession = window.localStorage.getItem(sessionKey);

    if (strSession) {
        try {
            let objSession = JSON.parse(strSession);
            this.setThis(objSession);
        } catch (err) {
            console.error(err);
        }
    } else {
        console.warn('There was no localStorage object to pull. Force login.');
    }

    this.add = function add(key, value) {
        let stringSession = JSON.stringify(value);

        //window.sessionStorage.setItem(key, stringSession);
        window.localStorage.setItem(key, stringSession);
    };

    this.get = function get(key) {
        //var user = JSON.parse(window.sessionStorage.getItem(key))
        var user = JSON.parse(window.localStorage.getItem(key));
        return user;
    };

    this.remove = function remove(key) {
        //window.sessionStorage.removeItem(key);
        window.localStorage.removeItem(key);
    };
}