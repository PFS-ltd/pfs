(function () {
    app.controller('registerModalController', registerModalController);

    function registerModalController($scope, $uibModalInstance, Auth) {
        var baseStructure =   {
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

        function ValidForm() {
            if ($scope.pwd != $scope.pwd2) {
                $scope.err = "Pass doens't match";
            } else {
                if ($scope.name == undefined) {
                    $scope.err = "Enter name";
                } else {
                    if ($scope.pwd.length < 5) {
                        $scope.err = "Password must be more then 5 symbols";
                    }
                    return true;
                }
            }
        }

        $scope.ok = function (email, pass,name ) {
            if (ValidForm()) {
                Auth.$createUserWithEmailAndPassword(email, pass)
                    .then(function (firebaseUser) {
                        console.log(firebase);
                        var db = firebase.database().ref('users/' + firebaseUser.uid);
                        firebase.database().ref('users/' + firebaseUser.uid).set(baseStructure);
                        firebase.database().ref('users/' + firebaseUser.uid+'/settings/roles/1').set({
                            "title": $scope.name 
                        })
                        $uibModalInstance.close();
                    }).catch(function (error) {
                        $scope.err = error;
                    });
            } else {
                console.log('err')
            }
        }
    }

    registerModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        'Auth'
    ]

})();