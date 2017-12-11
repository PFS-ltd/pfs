(function(){
    app.controller('delIncomeTransferController', ['$uibModalInstance','$scope', 'item', function ($uibModalInstance, $scope, item) {
        $scope.item = item;
        $scope.cancel = function() {
            $uibModalInstance.close(false);
    
        };
    
        $scope.ok = function() {
          
            $uibModalInstance.close(true);
        };
    }]) ;
})();