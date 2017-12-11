(function () {
    app.controller('loginModalController', loginModalController);

    function loginModalController($scope, $uibModalInstance) {
        $scope.cancel = function () {
            $uibModalInstance.close(false);
        };

        $scope.ok = function (email, pass) {
            
            $uibModalInstance.close({
                'email':email,
                'pass':pass, 
            });
        }
    }

    loginModalController.$inject = [
        '$scope',
        '$uibModalInstance'
    ]

})();