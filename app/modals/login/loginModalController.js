(function () {
    app.controller('loginModalController', loginModalController);

    function loginModalController($scope, $uibModalInstance, Auth, $translate) {
        $scope.cancel = function () {
            $uibModalInstance.close(false);
        };

        $scope.ok = function (email, pass) {
            pass = pass.trim();
            Auth.$signInWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                    $uibModalInstance.close({
                        'email': email,
                        'pass': pass,
                    })
                }).catch(function (error) {
                    // console.log(error);
                    if(error.code === 'auth/invalid-email') {
                        $scope.err = "Invalid email"
                    } else if(error.code === 'auth/user-not-found'){
                        $scope.err = 'UserNotFound'
                    } else if(error.code ==='auth/wrong-password') {
                        $scope.err = "Wrong password";
                    }
                });;
        }

    }

    loginModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        'Auth',
        '$translate'
    ]
})();