(function(){
    app.controller('delIncomeSourceController', ['$uibModalInstance','$scope', 'item', function ($uibModalInstance, $scope, item) {
        $scope.item = item;
        $scope.cancel = function() {
            $uibModalInstance.close(false);
    
        };
    
        $scope.ok = function() {
            // console.log(item);
            // item.id = item.$id;
            $uibModalInstance.close(true);
        };
    }]) ;
})();