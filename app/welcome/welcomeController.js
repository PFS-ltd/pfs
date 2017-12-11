(function () {
    var WelcomeController = app.controller('WelcomeController',
        function ($scope, $uibModal, Auth, $location, $state, currentAuth,) {
            if (currentAuth == null) {
                $state.go('root')
            } 
            else {
                $state.go('home')
            }
            
            $scope.signIn = function () {
                var modalLogin = $uibModal.open({
                    templateUrl: 'app/modals/login/loginModal.html',
                    controller: 'loginModalController',
                    size: 'sm',
                });
                modalLogin.result.then(function (result) {
                    Auth.$signInWithEmailAndPassword(result.email, result.pass)
                        .then(function (firebaseUser) {
                            $location.path('/home');
                        })
                });

            };

            $scope.signUp = function () {
                var modalRegister = $uibModal.open({
                    templateUrl: 'app/modals/register/registerModal.html',
                    controller: 'registerModalController',
                    size: 'sm',
                });
                modalRegister.result.then(function (result) {
                    // console.log(result);

                }).catch(function () {
                    // Modal dismissed.
                })
            };
        });

    WelcomeController.$inject = ['$scope', '$uibModal', 'Auth', '$location', '$state', 'currentAuth' ]
})();
