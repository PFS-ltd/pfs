(function(){
    app.controller('addIncomeAccountController', ['$uibModalInstance','$scope', function ($uibModalInstance, $scope) {
        $scope.cancel = function() {
            $uibModalInstance.close(false);
    
        };
    
        $scope.ok = function(item) {
            console.log(item);
            $uibModalInstance.close(item);
        };
    }]) ;
})();