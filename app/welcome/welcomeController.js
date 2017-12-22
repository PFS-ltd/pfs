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
                   
                            $state.go('home.income');
                        
                }).catch(function () {
                    // Modal dismissed.
                });

            };

            $scope.signUp = function () {
                var modalRegister = $uibModal.open({
                    templateUrl: 'app/modals/register/registerModal.html',
                    controller: 'registerModalController',
                    size: 'sm',
                });
                modalRegister.result.then(function (result) {
                    $location.path('/home')
                }).catch(function () {
                    // Modal dismissed.
                })
            };
        });

    WelcomeController.$inject = ['$scope', '$uibModal', 'Auth', '$location', '$state', 'currentAuth' ]
})();
