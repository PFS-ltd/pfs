(function(){
    app.controller('editIncomeSourceController', ['$uibModalInstance','$scope','item', function ($uibModalInstance, $scope, item) {
        $scope.item = item;
        $scope.cancel = function() {
            $uibModalInstance.close(false);
    
        };
    
        $scope.ok = function(item) {
            console.log(item);
            item.id = item.$id;
            $uibModalInstance.close(item);
        };
    }]) ;
})();