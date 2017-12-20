(function () {
    app.controller('loginModalController', loginModalController);

    function loginModalController($scope, $uibModalInstance,Auth) {
        $scope.cancel = function () {
            $uibModalInstance.close(false);
        };

        $scope.ok = function (email, pass) {
            Auth.$signInWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                    $uibModalInstance.close({
                        'email': email,
                        'pass': pass,
                    })}).catch(function (error) {
                        $scope.err = error;
                    });;
                }
    
    }

    loginModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        'Auth'
    ]
})();