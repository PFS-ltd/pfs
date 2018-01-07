(function () {
    app.controller('registerModalController', registerModalController);

    function registerModalController($scope, $uibModalInstance, Auth, $translate) {
        var baseStructure = {
            "costs": {
                "costsCategories": {
                    "-L-wiQkr_bQPLxFF_vnr": {
                        "id": "-L-wiQkr_bQPLxFF_vnr",
                        "income": "",
                        "limitPayment": 0,
                        "refillRate": "",
                        "regularPaSum": 0,
                        "regularPayment": false,
                        "sum": 0,
                        "title": "Базовая категория"
                    }
                }
            },
            "income": {
                "billsCategories": {
                    "-L03xTFqQzYSJefcEy1b": {
                        "amount": 0,
                        "dateOfRefill": "",
                        "frequencyOfPayment": 0,
                        "id": "-L03xTFqQzYSJefcEy1b",
                        "incomeCategory": "",
                        "regularRefill": false,
                        "regularRefillSum": 0,
                        "title": "Базовый счет"
                    }
                },
                "incomeCategories": {
                    "-L00wnI-6Uiy136CqEIH": {
                        "title": "Наличные деньги"
                    }
                }
            },
            "settings": {
                "roles": {
                    "1": {
                        "id": 1,

                    }
                },
                "themeColor": {
                    "colors": [
                        "dark",
                        "light"
                    ],
                    "selected": "light"
                }
            }
        }


        $scope.cancel = function () {
            $uibModalInstance.close(false);
        };

        function ValidForm(form) {
            form.pwd = form.pwd.trim();
            form.pwd2 = form.pwd2.trim();
            // console.log(form);
            var letters = /^[A-Za-zА-Яа-я]+$/;
            var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var password = /[0-9a-zA-Z!@#$%^&*]{6,}/;
            var space = /\s/;
            if (form.name === '') {
                $scope.err = "EnterName";
            } else
                if (!form.name.match(letters)) {
                    $scope.err = "NameAlphabets"
                } else
                    if (form.email === '') {
                        $scope.err = "EnterEmail"
                    } else
                        if (!form.email.match(email)) {
                            $scope.err = "EmailIsInvalid"
                        } else
                            if (form.pwd === "") {
                                $scope.err = "EnterPassword"
                            } else
                                if (form.pwd.match(space)) {
                                    $scope.err = "PasswordSpaces"
                                } else
                                    if (form.pwd.length < 5) {
                                        $scope.err = "PasswordLength"
                                    } else
                                        if (form.pwd2 === "") {
                                            $scope.err = "ConfirmPassword"
                                        } else
                                            if (form.pwd != form.pwd2) {
                                                $scope.err = "PassMismatch"
                                            } else {
                                                $scope.err = ""
                                                // console.log(form);
                                                return true;
                                            }
        }




        $scope.form = {
            name: '',
            pwd: '',
            email: '',
            pwd2: ''
        }

        $scope.ok = function (form) {
            if (ValidForm(form)) {
                // console.log(form);
                form.pwd = form.pwd.trim();
                form.pwd2 = form.pwd.trim();
                Auth.$createUserWithEmailAndPassword(form.email, form.pwd)
                    .then(function (firebaseUser) {
                        // console.log(firebase);
                        var db = firebase.database().ref('users/' + firebaseUser.uid);
                        firebase.database().ref('users/' + firebaseUser.uid).set(baseStructure);
                        firebase.database().ref('users/' + firebaseUser.uid + '/settings/roles/1').set({
                            "title": form.name
                        })
                        $uibModalInstance.close(form.name);
                    }).catch(function (error) {
                        // console.log(error)
                        if (error.code === 'auth/email-already-in-use') {
                            $scope.err = 'AlreadyInUse';
                        }
                    });
            } else {
                // console.log(form);
                // console.log(error)
            }
        }
    }

    registerModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        'Auth',
        '$translate'
    ]

})();