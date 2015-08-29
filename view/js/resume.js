var resumeApp = angular.module("resumeApp", ['easypiechart', 'ngDialog']);
resumeApp.controller("resumeCtrl", function($scope, $http, $parse, ngDialog, resumeService) {
    $scope.email = {
        "yourname": "",
        "address": "",
        "subject": "",
        "comments": ""
    };
    $http.get("./json/resume.json").success(function(data) {
        var index;
        var prop;
        var len = data.length;
        var propLen;
        var skillFlag = false;
        $scope.education = [];
        $scope.workExp = [];
        $scope.portfolio = [];
        $scope.intrests = [];

        $scope.about = {
            "Ename": data.about.Ename,
            "job": data.about.job,
            "me1": data.about.me1,
            "me2": data.about.me2,
            "me3": data.about.me3
        };

        $scope.contact = {
            "name": data.contact.name,
            "gender": data.contact.gender,
            "birth": data.contact.birth,
            "hometown": data.contact.hometown,
            "address": data.contact.address,
            "mobile": data.contact.mobile,
            "email": data.contact.email,
            "github": data.contact.github,
            "twitter": data.contact.twitter,
            "blog": data.contact.blog
        };

        for (prop in data) {
            propLen = data[prop].length;
            if (prop == "intrests") {
                for (index = 0; index < propLen; index++) {
                    $scope.intrests.push({
                        "item": data[prop][index].item,
                        "desc": data[prop][index].desc
                    });
                }
            }
            if (prop == "education") {
                for (index = 0; index < propLen; index++) {
                    $scope.education.push({
                        "date": data[prop][index].date,
                        "degree": data[prop][index].degree,
                        "school": data[prop][index].school,
                        "desc": data[prop][index].desc
                    });
                }
            }
            if (prop == "workExp") {
                for (index = 0; index < propLen; index++) {
                    $scope.workExp.push({
                        "date": data[prop][index].date,
                        "group": data[prop][index].group,
                        "job": data[prop][index].job,
                        "locate": data[prop][index].locate,
                        "desc": data[prop][index].desc
                    });
                }
            }
            if (prop == "portfolio") {
                for (index = 0; index < propLen; index++) {
                    $scope.portfolio.push({
                        "date": data[prop][index].date,
                        "project": data[prop][index].project,
                        "desc": data[prop][index].desc,
                        "cont": data[prop][index].cont
                    });
                }
            }
            if (prop == "profSkill" || prop == "persSkill") {
                skillFlag = true;
            }
            if (skillFlag == true) {
                $parse(prop).assign($scope, []);

                for (index = 0; index < propLen; index++) {
                    $scope[prop].push({
                        "item": data[prop][index].item,
                        "grade": data[prop][index].grade,
                        "style": data[prop][index].grade + "%"
                    });

                }
                skillFlag = false;
            }

        }

        $scope.options = {
            animate: {
                duration: 2000,
                enabled: true
            },
            barColor: '#20B2AA',
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'circle'
        };



    });

    $scope.sendEmail = function(email) {
        resumeService.email_send(email).then(function(res) {
            var status = res.status;

            if (status == 404){
                $scope.Msg="O MO~The Message post failure!";
                ngDialog.open({
                    template: 'alert.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            }
            if (status == 200){
                $scope.Msg="The Message post success!";
                ngDialog.open({
                    template: 'alert.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            }

        });
    };


});

resumeApp.service('resumeService', function($http) {
    return ({
        email_send: email_send
    });

    function email_send(item) {
        var request = $http({
            method: "post",
            url: "/resume/email_send/",
            data: item
        });
        return (request.then(handleSuccess, handleError));
    }

    function handleSuccess(response) {
        return (response);
    }

    function handleError(response) {
        return (response);
        if (!angular.isObject(response.data) || !response.data.message) {
            return ($q.reject("An unknown error occured."));
        } else {
            return ($q.reject(response.data.message));
        }
    }
});
