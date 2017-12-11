(function(){
    app.controller('editIncomeAccountController', ['$uibModalInstance','$scope', 'item', 
    function ($uibModalInstance, $scope, item) {
        $scope.item = item;
        $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
    
        };
    
        $scope.ok = function(item) {
            console.log(item);
            $uibModalInstance.close(item);
        };
    }]) ;
})();